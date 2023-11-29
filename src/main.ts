import {app, Menu, nativeImage, MessageChannelMain, Tray, BrowserWindow, dialog} from 'electron';
import path from 'path';
import {sendCpuAvg} from "./utils/sender/cpus";
import {sendConfig} from "./utils/sender/theme";
import {handleSearchEngine, handleSitesReader, willRunCmd} from "./utils/handles/getters";
import {listenExPro, listenOpenUrl, watchPosition} from "./utils/receiver/smalls";
import {sendWindowBlur} from "./utils/sender/window";
import {createAlertWindow} from "./windows/alert/index_a";
import {proxyMsg} from "./utils/sender/injectListen";

const ws = {
    /// メインウィンドウ
    __mwd: null as BrowserWindow,
    /// プロンプトウィンドウ
    __alt: null as BrowserWindow
}

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

        ws.__mwd = new BrowserWindow({
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
            ws.__mwd.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            ws.__mwd.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
        }

        if (config.main.opendevtool)
            ws.__mwd.webContents.openDevTools();
        sendCpuAvg(ws.__mwd)
        ws.__mwd.setPosition(config.main.position[0], config.main.position[1])
        ws.__mwd.setSkipTaskbar(true)
        ws.__mwd.show()
        sendConfig(ws.__mwd, config)
        sendWindowBlur(ws.__mwd, 'Main')
        handleSearchEngine()
        listenOpenUrl()
        willRunCmd()
        handleSitesReader()
        watchPosition(ws.__mwd, config)
        listenExPro(ws.__mwd, config)
        createAlertWindow(ws)
        proxyMsg(ws)
    })
};

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        const mainWindow = BrowserWindow.getAllWindows()[0];
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.on('ready', createWindow);

    app.whenReady().then(() => {
        tray = new Tray(appIconPath);
        const menu = Menu.buildFromTemplate([
            {
                label: '鼠标穿透', type: 'checkbox', click: menuItem => {
                    ws.__mwd.setIgnoreMouseEvents(menuItem.checked)
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
}