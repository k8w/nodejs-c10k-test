const http = require('http');

const reply = 'xxx'.repeat(1);

let reqNum = 0;

http.createServer((req, res) => {
    ++reqNum;
    res.end(reply);
}).listen(3001, () => {
    console.log('Server started...')
})

setInterval(() => {
    if (reqNum) {
        console.log(`${reqNum} req in past 1sec`);
        reqNum = 0;
    }
}, 1000)