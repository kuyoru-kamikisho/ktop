const {execFile,exec} = require("child_process");

execFile('../runners/kcron/core_arm_x86.exe', ['--list 5', 'w - - - - - 10 -'], {encoding: 'buffer'}, (error: any, stdout: string, stderr: string) => {
    if (error) {
        console.log(error)
        return;
    }
    const output = stdout.toString();
    console.log(output);
})