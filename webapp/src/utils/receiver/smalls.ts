import {ipcMain, screen} from "electron";
import type {BrowserWindow} from 'electron'
import fs from "fs";
const yaml = require('json2yaml')

const {exec} = require('child_process');

export function listenOpenUrl() {
    ipcMain.on('openurl', (e, url) => {
        exec('start ' + url, (err: any) => {
            console.error(err)
        })
    })
}

export function listenExPro(mw: BrowserWindow, cfg: any) {
    let initP: number[] = [];
    let x: number, y: number;
    ipcMain.on('expro', (e, b: boolean) => {
        const mainScreen = screen.getPrimaryDisplay()
        const {width, height} = mainScreen.size
        mw.setResizable(true)
        if (b) {
            initP = mw.getPosition();
            x = initP[0], y = initP[1];
            if (width - x < cfg.main.maxWidth) {
                x = width - cfg.main.maxWidth - 12
            }
            if (height - y < cfg.main.maxHeight) {
                y = height - cfg.main.maxHeight - 12
            }
            mw.setPosition(x, y, true)
            mw.setSize(cfg.main.maxWidth, cfg.main.maxHeight, true)
        } else {
            mw.setPosition(initP[0], initP[1], true)
            mw.setSize(cfg.main.minWidth, cfg.main.minHeight, true)
        }
        mw.setResizable(false)
    })
}

export function watchPosition(windowI: BrowserWindow, config: any) {
    windowI.on('moved',()=>{
        config.main.position = windowI.getPosition()
        const yamlText = yaml.stringify(config);
        fs.writeFile('./resources/config.yaml', yamlText, 'utf-8', (err: any) => {
            return;
        })
    })
}