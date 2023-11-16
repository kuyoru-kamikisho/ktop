import {contextBridge, ipcRenderer} from 'electron'

function cpuUsage(callback: any) {
    ipcRenderer.on('cpu-usage', callback)
}

function appConfig(callback: any) {
    ipcRenderer.on('app-config', callback)
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
    loadSearchEngine,
    openurl,
    getSites,
    changeExPro
};


contextBridge.exposeInMainWorld('electronAPI', apis)
