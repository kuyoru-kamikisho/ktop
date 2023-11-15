const {execSync} = require('child_process')

function runcmd(s) {
    try {
        execSync(s)
    } catch (e) {
        console.log(e)
    }
}

runcmd('shutdown /s /f /t 300')