import {BrowserWindow, screen} from "electron";
import path from "path";

const w_a = 320, h_a = 94;

/**
 * 320x94的不可选中窗口
 *
 * 窗口不可顶替，溢出的窗口将在其它web内容销毁后渲染
 */
export function createAlertWindow() {
    const mainScreen = screen.getPrimaryDisplay()
    const {width} = mainScreen.size

    const __alert = new BrowserWindow({
        title: 'alert',
        width: w_a,
        height: h_a,
        skipTaskbar: true,
        resizable: false,
        frame: false,
        movable: false,
        alwaysOnTop: true,
        transparent: true
    })
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        __alert.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + '/subpage/alert/');
        console.log(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        __alert.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/subpage/alert/index.html`));
    }
    __alert.setIgnoreMouseEvents(true);
    __alert.setPosition(width - w_a, 60);
    __alert.webContents.openDevTools();
}