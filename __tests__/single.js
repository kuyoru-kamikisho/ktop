const dns = require('dns');

const domain = 'www.google.com';

dns.lookup(domain, (err, address) => {
    if (err) {
        throw  err
    }

    console.log(`主机地址: ${address}`);
});