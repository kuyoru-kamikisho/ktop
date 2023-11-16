const {exec} = require('child_process')

function runcmd(s:string) {
    try {
        exec(s,(error:any, stdout:string, stderr:string)=>{
            console.log(stdout)
        })
    } catch (e) {
        console.log(e)
    }
}

runcmd('');