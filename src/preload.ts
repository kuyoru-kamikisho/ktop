import {contextBridge, ipcRenderer} from 'electron'

function cpuUsage(callback: any) {
    ipcRenderer.on('cpu-usage', callback)
}

function appConfig(callback: any) {
    ipcRenderer.on('app-config', callback)
}

function windowBlur(callback: any) {
    ipcRenderer.on('window-blur', callback)
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
    // send
    cpuUsage,
    windowBlur,
    appConfig,
    // invoke
    loadSearchEngine,
    getSites,
    // receive
    openurl,
    changeExPro
};


contextBridge.exposeInMainWorld('electronAPI', apis)
