var fs = require("fs");
var _a = require("child_process"), execFile = _a.execFile, exec = _a.exec;
exec('..\\runners\\kcron\\core.exe -l 5 w - - - - - 10 -', function (error, stdout, stderr) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(stdout);
});
