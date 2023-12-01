const fs = require('fs')
const path = require("path");
const https = require('https');
const http = require('http');

module.exports = {
    /**
     * 是否将本目录视为菜单目录。
     */
    use: true,

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
     */
    async onMounted() {
        const coreExePath = path.resolve(__dirname + '/hysteria.exe');
        const downloadUrl = 'https://download.hysteria.network/app/latest/hysteria-windows-amd64.exe'

        if (!fs.existsSync(coreExePath)) {
            console.log('开始下载')
            const fileStream = fs.createWriteStream(coreExePath);
            await this.downFile(downloadUrl, fileStream)
        }
    },
    /**
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