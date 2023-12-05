import {BrowserWindow, ipcMain} from "electron";
import type {WSO} from "../../main";

/**
 * 核心注入程序
 */
export function proxyMsg(ws: WSO) {
    ipcMain.on('msg_to_main', (e, o) => {
        ///---------------------------------------------------------------
        /// 用于打开提示窗口弹出提示
        if (o.to === 0) {
            ws.__mwd?.webContents.send('msg_to_render', o);
        } else if (o.to === 1) {
            ws.__alt?.webContents.send('msg_to_render', o);
        }
            ///---------------------------------------------------------------
        /// 用于执行外部程序或脚本
        else if (o.rung !== undefined) {
            const runner = ws.MENU_CLONE[o.rung];
            const menus = runner.mlist;
            const menu = menus[o.rune];

            if (runner.exclusive && !o.stop) {
                for (let i = 0; i < menus.length; i++) {
                    menus[i].kill?.();
                    ws.__mwd.webContents.send('msg_to_render', {
                        rung: o.rung,
                        rune: i,
                        running: false
                    })
                }
            }
            if (o.stop === true) {
                menu.kill?.();
                ws.__mwd.webContents.send('msg_to_render', {
                    rung: o.rung,
                    rune: o.rune,
                    running: false
                })
                return;
            }
            menu?.click(() => {
                ws.__mwd.webContents.send('msg_to_render', {
                    rung: o.rung,
                    rune: o.rune,
                    running: false
                })
            });
            if (menu?.kill) {
                ws.__mwd.webContents.send('msg_to_render', {
                    rung: o.rung,
                    rune: o.rune,
                    running: true
                })
            }
        }
    })
}