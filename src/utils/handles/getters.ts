import {execSync, execFile} from "child_process";

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
            execSync(args)
            return 1;
        } catch (e) {
            console.error(e)
            return null;
        }
    })
}

export function willParseCron() {
    ipcMain.handle('get-cron-time', (e, s) => {
        return new Promise((resolve, reject) => {
            execFile('./runners/kcron/core_arm_x86.exe', ['--list 5', s], {encoding: 'utf8'}, (error: any, stdout: string, stderr: string) => {
                if (error) {
                    reject(error)
                }
                resolve(stdout);
            })
        })
    })
}
