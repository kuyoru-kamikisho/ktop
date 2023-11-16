var exec = require('child_process').exec;
function runcmd(s) {
    try {
        exec(s, function (error, stdout, stderr) {
            console.log(stdout);
        });
    }
    catch (e) {
        console.log(e);
    }
}
runcmd('');
