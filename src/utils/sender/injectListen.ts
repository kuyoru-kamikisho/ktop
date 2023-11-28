import {BrowserWindow, ipcMain} from "electron";

/**
 * 核心注入程序
 */
export function proxyMsg(ws: any) {
    ipcMain.on('msg_to_main', (e, o) => {
        if (o.to === 0) {
            ws.__mwd?.webContents.send('msg_to_render', o);
        } else if (o.to === 1) {
            ws.__alt?.webContents.send('msg_to_render', o);
        }
    })
}