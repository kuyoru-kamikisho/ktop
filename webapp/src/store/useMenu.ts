import {defineStore} from "pinia";
import {mdiCogOutline, mdiPlayOutline, mdiTimerCogOutline, mdiVpn, mdiWeb} from "@mdi/js";

export default defineStore('useMenu', {
    state: () => ({
        mode: 0,
        menus: [
            {active: true, title: '网站', icon: mdiWeb},
            {active: false, title: '命令', icon: mdiPlayOutline},
            {active: false, title: '定时', icon: mdiTimerCogOutline},
            {active: false, title: '代理', icon: mdiVpn},
            {active: false, title: '设置', icon: mdiCogOutline},
        ]
    }),
    actions: {
        chooseM(i: number) {
            this.menus.forEach((o: any) => {
                o.active = false
            })
            this.menus[i].active = true
            this.mode = i
        }
    }
})
