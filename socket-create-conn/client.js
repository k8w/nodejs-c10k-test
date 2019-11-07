const net = require('net');

let succ = 0, fail = 0;

function connect() {
    return new Promise(rs => {
        let client = net.createConnection({
            host: 'localhost',
            port: 3001
        }, () => {
            ++succ;
            rs();
        });
        client.on('error', () => {
            ++fail;
        })
        client.on('close', () => {
            rs();
        })
    })
}

async function main() {
    let n = 0;
    succ = 0, fail = 0;
    let startTime = Date.now();
    for (let i = 0; i < 4; ++i) {
        console.log(`Batch ${i}, succ=${succ}, fail=${fail}`);
        await Promise.all(Array.from({ length: 5000 }, () => {
            ++n;
            return connect();
        }));
    }
    let time = Date.now() - startTime;
    console.log('Finish', `${time}ms req=${n} succ=${succ} fail=${fail} qps=${n / time * 1000}`)
}
main();