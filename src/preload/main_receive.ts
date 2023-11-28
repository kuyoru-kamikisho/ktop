import {ipcRenderer} from "electron";

export function openurl(url: string) {
    ipcRenderer.send('openurl', url)
}

export function changeExPro(b: boolean) {
    ipcRenderer.send('expro', b)
}

export function openAlertWindow() {
    ipcRenderer.send('open-alert-window')
}

export function closeAlertWindow() {
    ipcRenderer.send('close-alert-window')
}

export function msgToMain(o: any) {
    ipcRenderer.send('msg_to_main', o)
}
