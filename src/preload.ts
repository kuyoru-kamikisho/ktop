import {contextBridge, ipcRenderer} from 'electron'
import {appConfig, cpuUsage, msgToRender, windowBlur} from "./preload/main_send";
import {changeExPro, closeAlertWindow, msgToMain, openAlertWindow, openurl} from "./preload/main_receive";
import {buildRunners, getCmds, getCrons, getCronTime, getSites, loadSearchEngine, runCmd} from "./preload/main_invoke";

const apis = {
    cpuUsage,
    windowBlur,
    appConfig,
    msgToRender,

    loadSearchEngine,
    getSites,
    getCmds,
    runCmd,
    getCrons,
    getCronTime,
    buildRunners,

    openurl,
    msgToMain,
    changeExPro,
    openAlertWindow,
    closeAlertWindow
};

contextBridge.exposeInMainWorld('electronAPI', apis)
