import {ipcRenderer} from "electron";

export function cpuUsage(callback: any) {
    ipcRenderer.on('cpu-usage', callback)
}

export function appConfig(callback: any) {
    ipcRenderer.on('app-config', callback)
}

export function windowBlur(callback: any) {
    ipcRenderer.on('window-blur', callback)
}

export function msgToRender(callback: any) {
    ipcRenderer.on('msg_to_render', callback)
}
