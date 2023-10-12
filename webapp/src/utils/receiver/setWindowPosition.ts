import {BrowserWindow, ipcMain} from "electron";

const yaml = require('json2yaml')
const fs = require('fs');

let initX = 0, initY = 0, rememberP: any;

export function setWindowPosition(windowI: BrowserWindow, config: any) {
    ipcMain.on('set-window-position', (event, x, y) => {
        const x1 = initX + x;
        const y1 = initY + y;
        windowI.setPosition(x1, y1, true)
        clearTimeout(rememberP)
        rememberP = setTimeout(() => {
            config.main.position = [x1, y1]
            const yamlText = yaml.stringify(config);
            fs.writeFile('./resources/config.yaml', yamlText, 'utf-8', (err: any) => {
                return;
            })
        }, 1000)
    })
    ipcMain.on('mouse-action', (event, e) => {
        if (e === 'mousedown') {
            initX = windowI.getPosition()[0]
            initY = windowI.getPosition()[1]
        }
    })
}