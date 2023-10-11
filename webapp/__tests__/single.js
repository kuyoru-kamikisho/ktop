const {exec} = require('node:child_process');
setInterval(()=>{
    exec('typeperf "\\LogicalDisk(_Total)\\% Disk Time" -sc 1', {encoding:'GBK'},(error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
},1000)