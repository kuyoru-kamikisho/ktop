import {ipcRenderer} from "electron";

export function loadSearchEngine() {
    return ipcRenderer.invoke('load-search-engine')
}

export function getSites() {
    return ipcRenderer.invoke('get-sites')
}

export function getCmds() {
    return ipcRenderer.invoke('get-cmds')
}

export function runCmd(s: string) {
    return ipcRenderer.invoke('run-cmd', s)
}

export function getCronTime(s: string) {
    return ipcRenderer.invoke('get-cron-time', s)
}

export function getCrons() {
    return ipcRenderer.invoke('get-crons')
}

export function buildRunners() {
    return ipcRenderer.invoke('build-runners')
}
