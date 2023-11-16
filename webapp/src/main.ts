import {app, Menu, nativeImage, Tray, BrowserWindow, dialog} from 'electron';
import path from 'path';
import {sendCpuAvg} from "./utils/sender/cpus";
import {sendConfig} from "./utils/sender/theme";
import {handleSearchEngine, handleSitesReader} from "./utils/handles/getters";
import {listenExPro, listenOpenUrl, watchPosition} from "./utils/receiver/smalls";

let __mwd: BrowserWindow;
let tray: null | Tray = null;
const appIconPath = './resources/favicon.ico'
const readYaml = require('read-yaml');

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    readYaml('./resources/config.yaml', function (err: any, config: any) {
        if (err) {
            dialog.showErrorBox('错误', '未找到配置文件')
            app.quit()
            return;
        }

        __mwd = new BrowserWindow({
            icon: appIconPath,
            title: config.main.title,
            width: config.main.minWidth,
            height: config.main.minHeight,
            resizable: config.main.resizable,
            frame: config.build.frame,
            alwaysOnTop: config.main.alwaysOnTop,
            transparent: config.build.transparent,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
            },
        });

        // and load the index.html of the app.
        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            __mwd.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            __mwd.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
        }

        if (config.main.opendevtool)
            __mwd.webContents.openDevTools();
        sendCpuAvg(__mwd)
        __mwd.setPosition(config.main.position[0], config.main.position[1])
        __mwd.setSkipTaskbar(true)
        __mwd.show()
        sendConfig(__mwd, config)
        handleSearchEngine()
        listenOpenUrl()
        handleSitesReader()
        watchPosition(__mwd, config)
        listenExPro(__mwd, config)
    })
};

app.on('ready', createWindow);

app.whenReady().then(() => {
    tray = new Tray(appIconPath);
    const menu = Menu.buildFromTemplate([
        {
            label: '鼠标穿透', type: 'checkbox', click: menuItem => {
                __mwd.setIgnoreMouseEvents(menuItem.checked)
            }
        },
        {label: '退出', type: 'normal', role: 'quit'},
    ]);
    tray.setContextMenu(menu)
    tray.setTitle('ktop')
    app.dock?.hide();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        tray?.destroy();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});