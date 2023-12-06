const fs = require('fs')
const path = require('path')
const https = require('https')
const chp = require('child_process')

module.exports = {
    use: true,
    exclusive: true,
    menuTemplate: {
        name: 'menu-name',
        send_on: null,
        send_off: null,
        click(killback) {
        },
        kill() {
        }
    },
    async onMounted() {
        const MENU_SUMMARY = [];

        const nodeList = await this.parseSubscribe();
        console.log(nodeList)

        console.log(MENU_SUMMARY)
        return MENU_SUMMARY
    },
    genConfig(node_link) {
        const configTemplate = {
            "inbounds": [
                {
                    "port": 7776, // SOCKS 代理端口，在浏览器中需配置代理并指向这个端口
                    "listen": "127.0.0.1",
                    "protocol": "socks",
                    "settings": {
                        "udp": true
                    }
                },
                {
                    "port": 7777, // SOCKS 代理端口，在浏览器中需配置代理并指向这个端口
                    "listen": "127.0.0.1",
                    "protocol": "http",
                    "settings": {
                        "udp": true
                    }
                },
            ],
            "outbounds": [
                {
                    "protocol": "vmess",
                    "settings": {
                        "vnext": [
                            {
                                "address": "server", // 服务器地址，请修改为你自己的服务器 ip 或域名
                                "port": 10086, // 服务器端口
                                "users": [
                                    {
                                        "id": "b831381d-6324-4d53-ad4f-8cda48b30811"
                                    }
                                ]
                            }
                        ]
                    }
                },
                {
                    "protocol": "freedom",
                    "tag": "direct"
                }
            ],
            "routing": {
                "domainStrategy": "IPOnDemand",
                "rules": [
                    {
                        "type": "field",
                        "ip": ["geoip:private"],
                        "outboundTag": "direct"
                    }
                ]
            }
        }
    },
    parseSubscribe() {
        return new Promise((R, J) => {
            let nodeList = [];
            const requests = [];
            const SUBFILE_PATH = path.resolve(__dirname, 'ksub.txt');
            const subList = fs.readFileSync(SUBFILE_PATH, {encoding: 'utf-8'})

            const lines = subList.split(/\r\n/);

            for (let i = 0; i < lines.length; i++) {
                requests.push(Promise.resolve(this.kxt(lines[i]).then(data => {
                    const decodedString = atob(data);
                    const vnodes = decodedString.split(/\n/);
                    vnodes.pop();
                    nodeList = nodeList.concat(...vnodes);
                })))
            }

            Promise.all(requests).then(() => {
                R(nodeList);
            })
        })
    },
    kxt(url) {
        return new Promise((R, J) => {
            https.get(url, res => {
                if (res.statusCode === 200) {
                    let data = '';
                    res.on('data', (d) => {
                        data += d;
                    });
                    res.on('end', () => {
                        R(data)
                    })
                }
            }).on('error', e => {
                J(e);
            })
        })
    }
}
