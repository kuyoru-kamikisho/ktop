import {BrowserWindow, ipcMain} from "electron";

let initX = 0, initY = 0

export function setWindowPosition(windowI: BrowserWindow) {
    ipcMain.on('set-window-position', (event, x, y) => {
        windowI.setPosition(initX + x, initY + y, true)
    })
    ipcMain.on('mouse-action', (event, e) => {
        if (e === 'mousedown') {
            initX = windowI.getPosition()[0]
            initY = windowI.getPosition()[1]
        }
    })
}