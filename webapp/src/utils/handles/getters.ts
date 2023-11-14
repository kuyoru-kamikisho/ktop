const readYaml = require('read-yaml');
import {app, ipcMain} from 'electron'

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
}