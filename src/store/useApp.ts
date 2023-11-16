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
        sites: []
    }),
    actions: {
        shiftSearchEngine(n?: number) {
            let len = this.searchEngines.length;
            if (len > 0) {
                if (n === undefined) {
                    n = this.searchMode + 1 >= len
                        ? 0
                        : this.searchMode + 1
                }
                if (n !== -1)
                    this.searchMode = n
                this.msgBox = `您正在使用 <code>${this.searchEngines[this.searchMode].name}</code> 作为您的搜索引擎，按下 Enter 进行搜索`
            }
        },
        resetMsgbox() {
            this.msgBox = msgBoxI
        }
    }
})