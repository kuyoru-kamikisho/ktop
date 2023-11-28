import {execSync} from "child_process";

const readYaml = require('read-yaml');
import {app, dialog, ipcMain} from 'electron'

export function handleSearchEngine() {
    readYaml('./resources/searchEngine.yaml', function (err: any, o: any) {
        if (err) {
            app.quit()
        }
        if (o) {
            ipcMain.handle('load-search-engine', () => {
                return o
            })
        }
    })
}

export function handleSitesReader() {
    readYaml('./resources/sites.yaml', function (err: any, o: any) {
        if (err) {
            app.quit()
        }
        if (o) {
            ipcMain.handle('get-sites', () => {
                return o
            })
        }
    })
    readYaml('./resources/cmds.yaml', function (err: any, o: any) {
        if (err) {
            app.quit()
        }
        if (o) {
            ipcMain.handle('get-cmds', () => {
                return o
            })
        }
    })
    readYaml('./resources/crons.yaml', function (err: any, o: any) {
        if (err) {
            app.quit()
        }
        if (o) {
            ipcMain.handle('get-crons', () => {
                return o
            })
        }
    })
}

export function willRunCmd() {
    ipcMain.handle('run-cmd', (event, args) => {
        try {
            return execSync(args)
        } catch (e) {
            console.error(e)
        }
    })
}
