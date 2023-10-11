const si = require('systeminformation');

// 获取所有磁盘的读取和写入速率
si.fsStats().then((data) => {
    console.log(data)
    const disks = data.fsStats;
    disks.forEach((disk) => {
        console.log(`磁盘 ${disk.fs} 的读取速率: ${disk.rx_sec} bytes/s`);
        console.log(`磁盘 ${disk.fs} 的写入速率: ${disk.wx_sec} bytes/s`);
    });
});