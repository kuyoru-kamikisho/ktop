import type {BrowserWindow} from "electron";

/**
 * 当窗口失去焦点时触发
 * @param frameW 窗口实例
 * @param name 为此窗口命名
 */
export function sendWindowBlur(frameW: BrowserWindow, name: string) {
    frameW.on('blur', () => {
        frameW.webContents.send('window-blur', name)
    })
}