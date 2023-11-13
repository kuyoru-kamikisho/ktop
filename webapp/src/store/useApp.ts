import {defineStore} from "pinia";

export default defineStore('useApp', {
    state: () => ({
        appConfig: null as any,
        mode: 0,
        msgBox:"欢迎使用 ktop ！"
    })
})