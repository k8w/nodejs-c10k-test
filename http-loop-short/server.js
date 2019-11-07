const http = require('http');

let conn = 0;

let server = http.createServer((req, res) => {
    if (!startTime) {
        startTime = Date.now();
    }

    ++lastReq;

    setTimeout(() => {
        res.end('ok');
    }, 20)

    req.on('data', v => { })
}).on('connection', c => {
    ++conn;
    c.on('close', () => {
        --conn;
    })
}).listen(3001, () => {
    console.log('Server started...')
})

let lastReq = 0, totalReq = 0, startTime = 0;
setInterval(() => {
    if (lastReq) {
        totalReq += lastReq;
        let qps = totalReq / (Date.now() - startTime) * 1000 | 0;
        console.log(`${lastReq} req in past 1 sec, totalReq=${totalReq}, qps=${qps}, conn=${conn}`);
        lastReq = 0;
    }
    else {
        // totalReq = 0;
        // startTime = 0;
    }
}, 1000)