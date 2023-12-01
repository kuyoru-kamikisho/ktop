const fs = require('fs')
const dns = require('dns')
const path = require("path");
const https = require('https');
const http = require('http');

module.exports = {
    /**
     * 是否将本目录视为菜单目录。
     */
    use: true,

    /**
     * 是否独占代理模块
     * 启用后菜单内的任何一项触发后都会停止其它启动中的菜单项
     * 该属性会影响所有执行器的菜单
     * 对已经执行结束的执行器不会产生影响
     */
    exclusive: true,

    /**
     * 一个执行器菜单项的模板
     *
     * onMounted应该返回一个由 menuTemplate 构成的数组
     *
     * 除被标记为菜单属性的，均视为用户自定义属性
     */
    menuTemplate: {
        /**
         * 菜单属性：名称
         */
        name: 'menu-name',
        /**
         * 菜单属性：点击时触发
         */
        click() {
        }
    },

    /**
     * 在应用程序启动完成后，若 use 为真，则会执行本方法。
     * onMounted是唯一会被应用程序直接执行的方法
     *
     * 您可以在这里定义其他方法，
     * 但是必须在onMounted内部使用在会被间接调用。
     *
     * 该方法内必须返回对应的菜单列表
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
        const downloadUrl = 'https://download.hysteria.network/app/latest/hysteria-windows-amd64.exe'

        if (!fs.existsSync(coreExePath)) {
            console.log('开始下载')
            const fileStream = fs.createWriteStream(coreExePath);
            await this.downFile(downloadUrl, fileStream)
        }

        const nodeList = fs.readFileSync(configs, {encoding: 'utf-8'});
        const split = nodeList.split(/\r\n/);
        const configTemplate = {
            server: "",
            socks5: {
                listen: "127.0.0.1:10809",
                timeout: 1000
            },
            auth: "",
            tls: {
                sni: ""
            }
        }
        const MENULIST = []
        for (const line of split) {
            const b = line.startsWith('hysteria2://');
            if (b) {
                const menu = this.menuTemplate
                const hurl = new URL(line)

                const params = hurl.searchParams;
                const domain = hurl.hostname
                const port = hurl.port

                const dnsP = dns.promises
                await dnsP.lookup(domain).then(value => {
                    configTemplate.server = value.address + ':' + port;
                    configTemplate.auth = hurl.username
                    configTemplate.tls.sni = params.get('sni')
                    menu.configs = []
                    menu.configs.push(configTemplate)
                    MENULIST.push(menu)
                })
            }
        }

        console.log(JSON.stringify(MENULIST, null, ' '))
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
    }
}