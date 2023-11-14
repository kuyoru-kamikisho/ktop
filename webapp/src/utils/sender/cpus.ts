import * as os from "os";
import {BrowserWindow} from "electron";

const TIME = 1520

export function sendCpuAvg(windowI: BrowserWindow) {
    setInterval(() => {
        const memory_usage = 1 - os.freemem() / os.totalmem();
        getCPUUsage(cpu_usage => {
            windowI.webContents.send('cpu-usage', cpu_usage, memory_usage);
        })
    }, TIME)
}


/**
 * 获取cpu的使用时间、总时间
 * @returns {{total: number, idle: number}}
 */
function getCpuInfo() {
    const cpus = os.cpus();
    let user = 0;
    let nice = 0;
    let sys = 0;
    let idle = 0;
    let irq = 0;
    let total = 0;

    for (const cpu in cpus) {
        // eslint-disable-next-line no-prototype-builtins
        if (!cpus.hasOwnProperty(cpu)) continue;
        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }

    total = user + nice + sys + idle + irq;

    return {
        'idle': idle,
        'total': total
    };
}

/**
 * 获取cpu占用情况并传入回调函数
 * @param callback 回调函数，使用率或剩余率会被传入回调函数的第一个参数
 * @param free 剩余模式
 */
function getCPUUsage(callback: { (usage: number): void }, free?: boolean) {
    const stats1 = getCpuInfo();
    const startIdle = stats1.idle;
    const startTotal = stats1.total;

    setTimeout(function () {
        const stats2 = getCpuInfo();
        const endIdle = stats2.idle;
        const endTotal = stats2.total;

        const idle = endIdle - startIdle;
        const total = endTotal - startTotal;
        const perc = idle / total;
        if (free === true)
            callback(perc);
        else
            callback((1 - perc));
    }, TIME);
}
