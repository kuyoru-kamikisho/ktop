import {contextBridge, ipcRenderer} from 'electron'

function cpuUsage(callback: any) {
    ipcRenderer.on('cpu-usage', callback)
}

function appConfig(callback: any) {
    ipcRenderer.on('app-config', callback)
}

function setWindowPosition(offsetX: number, offsetY: number) {
    ipcRenderer.send('set-window-position', offsetX, offsetY)
}

function mouseAction(e: string) {
    ipcRenderer.send('mouse-action', e)
}

function loadSearchEngine() {
    return ipcRenderer.invoke('load-search-engine')
}

function getSites() {
    return ipcRenderer.invoke('get-sites')
}

function openurl(url: string) {
    ipcRenderer.send('openurl', url)
}

function changeExPro(b: boolean) {
    ipcRenderer.send('expro', b)
}

const apis = {
    cpuUsage,
    appConfig,
    setWindowPosition,
    mouseAction,
    loadSearchEngine,
    openurl,
    getSites,
    changeExPro
};


contextBridge.exposeInMainWorld('electronAPI', apis)
