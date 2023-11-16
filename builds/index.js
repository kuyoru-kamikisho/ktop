const fs = require('fs')
const path = require('path')

function logBlue(s) {
    console.log(`\x1b[34m■ ${s}\x1b[0m`)
}

function moveResources(dirA, dirB) {
    if (!fs.existsSync(dirA) || !fs.existsSync(dirB)) {
        logBlue('dirA or dirB not exist.\n' + dirA + '\n' + dirB)
        return;
    }
    const resources = fs.readdirSync(dirA)
    resources.forEach((f) => {
        const sourcePath = path.join(dirA, f);
        const destinationPath = path.join(dirB, f);
        fs.renameSync(sourcePath, destinationPath);
    })
    logBlue('移动资源文件：完成')
}

function deleteDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        if (fs.lstatSync(dirPath).isDirectory()) {
            fs.readdirSync(dirPath).forEach(function (file, index) {
                const currentPath = dirPath + '/' + file;
                if (fs.lstatSync(currentPath).isDirectory()) {
                    deleteDirectory(currentPath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            });
            // 删除空目录
            fs.rmdirSync(dirPath);
        } else {
            // 删除文件
            fs.unlinkSync(dirPath);
        }
        logBlue(`目标 ${dirPath} 已成功删除!`)
    } else {
        logBlue(`目标 ${dirPath} 不存在。`)
    }
}

const adi = './out/ktop-win32-x64/resources/app'
const bdi = './out/ktop-win32-x64'

moveResources(
    adi + '/resources',
    bdi + '/resources')
moveResources(
    adi + '/proxys',
    bdi + '/proxys')
deleteDirectory(adi + '/builds')
deleteDirectory(adi + '/__tests__')
deleteDirectory(adi + '/.idea')
deleteDirectory(adi + '/imgs')
deleteDirectory(adi + '/src')
deleteDirectory(adi + '/.eslintrc.js')
deleteDirectory(adi + '/resources')
deleteDirectory(adi + '/proxys')
