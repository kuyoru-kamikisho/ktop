import {ipcMain} from "electron";
import type {BrowserWindow} from 'electron'

const {exec} = require('child_process');

export function listenOpenUrl() {
    ipcMain.on('openurl', (e, url) => {
        exec('start ' + url, (err: any) => {
            console.log(err)
        })
    })
}

export function listenExPro(mw: BrowserWindow, cfg: any) {
    const initP = mw.getPosition();
    const initS = mw.getSize();
    ipcMain.on('expro', (e, b: boolean) => {
        if (b) {
            mw.setSize(cfg.main.width, cfg.main.height)
        } else {
            console.log('debug:change-window-size')
            mw.unmaximize()
            mw.setSize(96, 28)
        }
    })
}