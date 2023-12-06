"use strict";
exports.__esModule = true;
var path = require('node:path');
var https = require('node:https');
var fs = require('fs');
var dir1 = path.resolve('../runners');
fs.readdirSync(dir1).forEach(function (s) {
    var dir2 = path.resolve(dir1, s);
    var b = fs.statSync(dir2).isDirectory();
    if (b && s === 'xray') {
        var runner = require(dir2);
        if (runner && runner.use && runner.onMounted) {
            runner.onMounted();
        }
    }
});
