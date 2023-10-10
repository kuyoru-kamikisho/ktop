const os = require('os')

let total = 0;
let unuse = 0;
let avera_cpu = 0;
let avera_mem = 0;
let cpu_nums = 0;
let cpus = [];
setInterval(() => {
    cpus = os.cpus()
    avera_mem = parseInt((100 * (1 - os.freemem() / os.totalmem())).toFixed(0))
    cpu_nums = cpus.length
    for (const cpu of cpus) {
        total = cpu.times.idle
            + cpu.times.user
            + cpu.times.nice
            + cpu.times.sys
            + cpu.times.irq
        unuse = cpu.times.idle
        avera_cpu += 100 * (1 - cpu.times.idle / total);
    }
    avera_cpu = parseFloat((avera_cpu / cpu_nums).toFixed(3))
    console.log(`内存：${avera_mem}  cpu：${avera_cpu}`)
}, 1000)

console.log(os.freemem())
console.log(os.totalmem())