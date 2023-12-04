import {execSync, exec} from "child_process";
import {app, dialog, ipcMain} from 'electron'
import path from "node:path";
import fs from "fs";

const readYaml = require('read-yaml');

const R

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
            exec('.\\runners\\kcron\\core.exe --list 5 ' + s, (error: any, stdout: string, stderr: string) => {
                if (error) {
                    reject(error)
                }
                resolve(stdout);
            })
        })
    })
}

export function willBuildRunners() {
    ipcMain.handle('build-runners', () => {
        return new Promise((R, J) => {
            const summary: any = [];
            const promises: any = [];
            const dirRoot = './runners'
            const dirs = fs.readdirSync(dirRoot);

            for (let i = 0; i < dirs.length; i++) {
                const dir = dirs[i];
                const rgroup = {
                    rname: dir,
                    mlist: [] as any[]
                }
                const dir2 = path.resolve(dirRoot, dir);
                const b = fs.statSync(dir2).isDirectory();
                if (b) {
                    const runner = require(dir2);
                    if (runner && runner.use && runner.onMounted) {
                        promises.push(Promise.resolve(runner.onMounted().then((r: any) => {
                            rgroup.mlist = r;
                            summary.push(rgroup);
                        })))
                    }
                }
            }
            Promise.all(promises).then(() => {
                R(JSON.stringify(summary));
            })
        })
    })
}
