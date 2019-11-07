const http = require('http');

let totalReq = 0;
let reqNum = 0;

http.createServer((req, res) => {
    ++reqNum;
    res.end();
}).listen(3001, () => {
    console.log('Server started...')
})

setInterval(() => {
    if (reqNum) {
        totalReq += reqNum;
        console.log(`${reqNum} req in past 1sec, total=${totalReq}`);
        reqNum = 0;
    }
    else {
        totalReq = 0;
    }
}, 1000)