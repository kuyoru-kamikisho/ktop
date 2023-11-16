import {BrowserWindow} from "electron";

export function sendConfig(windowI: BrowserWindow, o: any) {
    let nums = 0;
    const sender = setInterval(() => {
        nums++
        windowI.webContents.send('app-config', o);
        if (nums > 9)
            clearInterval(sender)
    }, 1000)
}