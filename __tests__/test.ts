import {Buffer} from 'node:buffer';
import {writeFile} from 'node:fs/promises';

const path = require('node:path')
const https = require('node:https');
const fs = require('fs')

const dir1 = path.resolve('../runners');
fs.readdirSync(dir1).forEach((s: any) => {
    const dir2 = path.resolve(dir1, s);
    const b = fs.statSync(dir2).isDirectory();
    if (b && s === 'xray') {
        const runner = require(dir2);
        if (runner && runner.use && runner.onMounted) {
            runner.onMounted();
        }
    }
})