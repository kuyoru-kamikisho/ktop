import {app, Menu, nativeImage, Tray, BrowserWindow} from 'electron';
import path from 'path';
import {sendCpuAvg} from "./utils/sender/cpus";
import {sendConfig} from "./utils/sender/theme";
import {setWindowPosition} from "./utils/receiver/setWindowPosition";

let tray: null | Tray = null;
const appIconPath = './resources/favicon.ico'
const readYaml = require('read-yaml');

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    readYaml('./resources/config.yaml', function (err: any, config: any) {
        if (err) throw err

        const mainWindow = new BrowserWindow({
            icon: appIconPath,
            title: config.main.title,
            width: config.main.width,
            height: config.main.height,
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
            mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
        }

        if (config.main.opendevtool)
            mainWindow.webContents.openDevTools();
        sendCpuAvg(mainWindow)
        mainWindow.setPosition(config.main.position[0], config.main.position[1])
        mainWindow.setSkipTaskbar(true)
        mainWindow.show()
        sendConfig(mainWindow, config)
        setWindowPosition(mainWindow, config)
    })
};

app.on('ready', createWindow);

app.whenReady().then(() => {
    tray = new Tray(appIconPath);
    const menu = Menu.buildFromTemplate([
        {label: '退出', type: 'normal', role: 'quit'}
    ]);
    tray.setContextMenu(menu)
    tray.setTitle('ktop')
    app.dock.hide();
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