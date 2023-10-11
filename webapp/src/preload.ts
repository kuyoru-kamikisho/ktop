// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron'

export function cpuUsage(callback: any) {
    ipcRenderer.on('cpu-usage', callback)
}

export function appConfig(callback: any) {
    ipcRenderer.on('app-config', callback)
}

export function setWindowPosition(offsetX: number, offsetY: number) {
    ipcRenderer.send('set-window-position', offsetX, offsetY)
}
export function mouseAction(e:string) {
    ipcRenderer.send('mouse-action', e)
}

export const apis = {
    cpuUsage,
    appConfig,
    setWindowPosition,
    mouseAction
};


contextBridge.exposeInMainWorld('electronAPI', apis)
