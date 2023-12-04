import {defineStore} from "pinia";

const msgBoxI = "欢迎使用 ktop ！";

export default defineStore('useApp', {
    state: () => ({
        exPro: false,
        appConfig: null as any,
        msgBox: msgBoxI,
        searchText: '',
        searchMode: 0,
        searchEngines: [],
        sites: [],
        crons: [],
        cmds: [],
        runners: []
    }),
    actions: {
        shiftSearchEngine(n?: number) {
            const len = this.searchEngines.length;
            if (len > 0) {
                if (n === undefined) {
                    n = this.searchMode + 1 >= len
                        ? 0
                        : this.searchMode + 1
                }
                if (n !== -1)
                    this.searchMode = n
                this.msgBox = `使用 <code>${this.searchEngines[this.searchMode].name}</code> 搜索。 按下 Enter 进行搜索，Tab 切换搜索方式`
            }
        },
        resetMsgbox() {
            this.msgBox = msgBoxI
        },
        runCmd(o: any) {
            o.processing = true
            if (o.send) {
                window.electronAPI.openAlertWindow()
                window.electronAPI.msgToMain({
                    to: 1,
                    title: '执行命令',
                    text: o.name
                })
            }
            window.electronAPI.runCmd(o.cmd).then(() => {
                o.processing = false
            })
        }
    }
})