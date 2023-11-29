var _a = require("child_process"), execFile = _a.execFile, exec = _a.exec;
execFile('../runners/kcron/core_arm_x86.exe', ['--list 5', 'w - - - - - 10 -'], { encoding: 'buffer' }, function (error, stdout, stderr) {
    if (error) {
        console.log(error);
        return;
    }
    var output = stdout.toString();
    console.log(output);
});
