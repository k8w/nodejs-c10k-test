const net = require('net');

function connect() {
    return new Promise(rs => {
        let client = net.createConnection({
            host: 'localhost',
            port: 3001
        }, () => {
            ++succ;
            rs();
        });
        client.on('error', e => {
            ++fail;
            rs();
            console.log('Error', e.message)
        })
        client.on('data', v => { })
    })
}

let send = 0, succ = 0, fail = 0, lastTime = 0;
let totalSucc = 0, startTime = Date.now();
async function main() {
    totalSucc += succ;
    let time = lastTime ? (Date.now() - lastTime) : 0;
    let realCps = totalSucc / (Date.now() - startTime) * 1000 | 0;
    console.log(`${time}ms cps=${realCps} send=${send} succ=${succ} fail=${fail}`)
    send = recv = succ = fail = 0;
    lastTime = Date.now();

    await Promise.all(Array.from({ length: 5000 }, () => {
        ++send;
        return connect();
    }));
}
main();
setInterval(main, 1000);