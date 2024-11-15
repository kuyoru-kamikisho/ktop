const fs = require('fs')
const dns = require('dns')
const path = require("path");
const https = require('https');
const http = require('http');
const chp = require('child_process')

module.exports = {
    /**
     * 是否将本目录视为菜单目录。
     */
    use: true,

    /**
     * 是否独占代理模块
     * 启用后菜单内的任何一项触发后都会停止其它启动中的菜单项
     * ktop会在创建新进程之前尝试调用所有菜单项的 kill 方法
     * 该属性只会影响当前执行器模块内部的菜单
     * 对已经执行结束的执行器不会产生影响
     */
    exclusive: true,

    /**
     * 一个执行器菜单项的基础模板
     * onMounted应该返回一个由 menuTemplate 构成的数组
     * 除被标记为菜单属性的，均视为用户自定义属性
     * 这只是一个模板对象，任何属性和函数都不应该定义到此处
     */
    menuTemplate: {
        /**
         * 菜单属性：名称
         */
        name: 'menu-name',
        /**
         * @type string|null
         * 当该属性的值不为 null或空字符串 时，
         * 启用菜单时将弹出提示
         */
        send_on: null,
        /**
         * @type string|null
         * 当该属性的值不为 null或空字符串 时，
         * 关闭菜单时将弹出提示
         */
        send_off: null,
        /**
         * 菜单属性：点击时触发
         *
         * @param killback {Function}
         * 当你执行的程序自动杀死自身进程时，
         * 这个杀死自身的动作应该让ktop主程序知道，
         * ktop会在click函数的第一个参数传入一个回调，
         * 你应该在合适的时机调用这个回调，
         * 否则可能会一直显示为正在运行，
         * 即使程序已经退出。
         */
        click(killback) {
        },
        /**
         * 如果执行器并非可以在短时间内执行结束的程序，那应该传入一个kill函数
         * 否则请移除此函数定义（只要定义了kill函数，点击后就会进入“运行中”状态，
         * 该状态只能通过调用kill函数取消）。
         * 如果不提供此函数，则ktop会认为此程序是可以瞬间执行完成的程序。
         */
        kill() {
        }
    },

    /**
     * 用户自定义属性
     */
    spawnH: null,

    /**
     * 在应用程序启动完成后，若 use 为真，则会执行本方法。
     * onMounted是唯一会被应用程序直接执行的方法
     *
     * 您可以在这里定义其他方法，
     * 但是必须在onMounted内部使用在会被间接调用。
     *
     * 该方法内必须返回一个菜单列表
     *
     * 不得移除async标记，因为在设计上该方法必须为异步函数。
     *
     * ktop本身并没有任何形式的菜单项，任何被渲染出来的菜单项，
     * 其执行逻辑都在本方法中生成。
     *
     * 在将您的逻辑编写到onMounted时，请通过您直接调试本文件以避免程序执行错误
     * 如果您使用node直接执行您的逻辑可以成功，那么在ktop里面应该也可以执行
     *
     * 注意：您应该使用原生nodejs模块，就像本示例这样。
     * 注意：您不应该在写入文件操作中使用相对路径，避免覆盖程序文件。
     */
    async onMounted() {
        const configs = path.resolve(__dirname, 'klist.txt')
        const coreExePath = path.resolve(__dirname, 'hysteria.exe');
        const configFileOut = path.resolve(__dirname, 'config.json')
        const downloadUrl = 'https://download.hysteria.network/app/latest/hysteria-windows-amd64.exe'

        if (!fs.existsSync(coreExePath)) {
            console.log('开始下载')
            const fileStream = fs.createWriteStream(coreExePath);
            await this.downFile(downloadUrl, fileStream)
        }

        const nodeList = fs.readFileSync(configs, {encoding: 'utf-8'});
        const split = nodeList.split(/[\r\n]/);
        const configTemplate = {
            server: "",
            socks5: {
                listen: "127.0.0.1:7778",
                timeout: 1000
            },
            http: {
                listen: "127.0.0.1:7779"
            },
            auth: "",
            tls: {
                sni: ""
            }
        }
        const MENULIST = []
        for (let i = 0; i < split.length; i++) {
            let line = split[i];
            const b = line.startsWith('hysteria2://');
            if (b) {
                const menu = JSON.parse(JSON.stringify(this.menuTemplate))
                const hurl = new URL(line)

                const params = hurl.searchParams;
                const domain = hurl.hostname
                const port = hurl.port

                const dnsP = dns.promises
                await dnsP.lookup(domain).then(value => {
                    configTemplate.server = value.address + ':' + port;
                    configTemplate.auth = hurl.username
                    configTemplate.tls.sni = params.get('sni')
                    menu.name = '节点' + i
                    menu.config = configTemplate
                    menu.click = (killback) => {
                        fs.writeFileSync(
                            configFileOut,
                            JSON.stringify(menu.config, null, ' '),
                            {encoding: 'utf-8'}
                        );

                        this.spawnH = chp.spawn(coreExePath, ['-c', configFileOut]);
                        this.spawnH.stdout.on('data', (data) => {
                            console.log(`stdout: ${data}`);
                        });

                        this.spawnH.stderr.on('data', (data) => {
                            console.error(`stderr: ${data}`);
                        });

                        this.spawnH.on('close', (code) => {
                            killback?.();
                            console.log(`child process exited with code ${code}`);
                        });

                        this.changeProxy(true, menu.config.http.listen);
                    }
                    menu.kill = () => {
                        this.spawnH?.kill();
                        this.changeProxy(false, '0')
                    }
                    MENULIST.push(menu)
                })
            }
        }
        return MENULIST;
    },

    /**
     * 这是一个自定义函数
     * 用于下载文件
     * @param url
     * @param stream
     * @returns {Promise<unknown>}
     */
    downFile(url, stream) {
        return new Promise((resolve, reject) => {
            const hget = url.charAt(4).localeCompare('s') ? http : https;
            const hgeter = hget.get(url, res => {
                if (res.statusCode === 200) {
                    res.pipe(stream);
                    stream.on('finish', () => {
                        stream.close();
                        resolve();
                    })
                } else if (res.statusCode === 302) {
                    return this.downFile(res.headers.location, stream);
                }
            })
            hgeter.on('error', err => {
                reject(err);
            })
        })
    },
    changeProxy(enable, url) {
        if (enable) {
            console.log('启用代理：' + url)
            const cmd = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f';
            chp.execSync(cmd);

            const proxySettingsCmd = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer /t REG_SZ /d "' + url + '" /f';
            chp.execSync(proxySettingsCmd);
        } else {
            console.log('关闭代理')
            const cmd = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f';
            chp.execSync(cmd);
        }
    }
}