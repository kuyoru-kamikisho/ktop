// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron'

export function cpuUsage(callback: any) {
    ipcRenderer.on('cpu-usage', callback)
}

contextBridge.exposeInMainWorld('electronAPI', {
    cpuUsage
})
