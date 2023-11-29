import {BrowserWindow, ipcMain, screen} from "electron";
import path from "path";

let hasOpened = false;
const w_a = 320, h_a = 94;

/**
 * 320x94的不可选中窗口
 *
 * 窗口不可顶替，溢出的窗口将在其它web内容销毁后渲染
 */
export function createAlertWindow(ws: any) {
    const mainScreen = screen.getPrimaryDisplay()
    const {width} = mainScreen.size

    ws.__alt = new BrowserWindow({
        title: 'alert',
        width: w_a,
        height: h_a,
        skipTaskbar: true,
        resizable: false,
        frame: false,
        movable: false,
        alwaysOnTop: true,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        ws.__alt.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + '/subpage/alert/');
        console.log(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        ws.__alt.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/subpage/alert/index.html`));
    }
    ws.__alt.setIgnoreMouseEvents(true);
    ws.__alt.setPosition(width - w_a, 60);

    ipcMain.on('open-alert-window', () => {
        if (hasOpened) return;
        hasOpened = true;
        ws.__alt.show();
        ws.__alt.webContents.openDevTools();

    })
    ipcMain.on('close-alert-window', () => {
        if (!hasOpened) return;
        ws.__alt.hide();
        hasOpened = false
    })
}