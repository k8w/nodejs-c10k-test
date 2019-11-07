const http = require('http');

let connNum = 0;

http.createServer((req, res) => {
    ++connNum;
    res.write('ok');

    res.on('close', () => {
        --connNum;
    })
}).listen(3001, () => {
    console.log('Server started...')
})

setInterval(() => {
    if (connNum) {
        console.log(`Active conn: ${connNum}`);
    }
}, 1000)