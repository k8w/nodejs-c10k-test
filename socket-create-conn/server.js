const net = require('net');

let connNum = 0;
let connChange = 0;

const server = net.createServer((c) => {
    ++connChange;
    c.on('error', () => { })
    c.on('close', () => {
        --connChange;
    });
});
server.on('error', (err) => {
    console.log('SocketError', err)
});
server.listen(3001, () => {
    console.log('Server started...');
});

setInterval(() => {
    if (connChange) {
        connNum += connChange;
        console.log(`${connChange} conn last 1 sec, total=${connNum}`)
        connChange = 0;
    }
}, 1000)