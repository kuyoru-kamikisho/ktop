let initX: number, initY: number,
    deltaX: number, deltaY: number,
    isDing: boolean, isUpped: boolean,
    targetDom: any

function mouseDown(e: any) {
    window.electronAPI.mouseAction(e.type)
    isDing = true
    initX = e.screenX
    initY = e.screenY
    targetDom.addEventListener('mouseup', mouseUp)
    targetDom.addEventListener('mousemove', mouseMove)
    targetDom.addEventListener('mouseleave', mouseLeave)
}

function mouseUp(e: any) {
    window.electronAPI.mouseAction(e.type)
    isUpped = true
    uninstall()
}

function mouseMove(e: any) {
    window.electronAPI.mouseAction(e.type)
    if (isDing) {
        deltaX = e.screenX - initX
        deltaY = e.screenY - initY
        window.electronAPI.setWindowPosition(deltaX, deltaY)
    }
}

function mouseLeave(e: any) {
    window.electronAPI.mouseAction(e.type)
    isUpped = true
    uninstall()
}

function uninstall() {
    targetDom.removeEventListener('mouseup', mouseUp)
    targetDom.removeEventListener('mousemove', mouseMove)
    targetDom.removeEventListener('mouseleave', mouseLeave)
}

export function registerWindowMove(dom?: any) {
    targetDom = dom ?? document
    targetDom.addEventListener('mousedown', mouseDown)
}