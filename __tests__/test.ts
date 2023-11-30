const fs = require("fs");
const {execFile, exec} = require("child_process");

exec('..\\runners\\kcron\\core.exe -l 5 w - - - - - 10 -', (error: any, stdout: string, stderr: string) => {
    if (error) {
        console.log(error)
        return;
    }
    console.log(stdout);
})