const http = require('http');

errTime = 0;

function connect() {
    return new Promise(rs => {
        http.get('http://192.168.2.104:3001', res => {
            let data;
            res.on('data', v => {
                data = v;
            })
            res.on('end', () => {
                if (data == 'ok') {
                    ++succ;
                }
            })
            res.on('close', () => {
                rs();
            })
        }).on('error', e => {
            if (e.code === 'ENOBUFS') {
                errTime = Date.now();
            }
            ++fail;
        });
    })
}

let send = 0, succ = 0, fail = 0, lastTime = 0;
let totalSucc = 0, startTime = Date.now();
async function main() {
    totalSucc += succ;
    let time = lastTime ? (Date.now() - lastTime) : 0;
    let qps = totalSucc / (Date.now() - startTime) * 1000 | 0;
    console.log(`${time}ms qps=${qps} send=${send} succ=${succ} fail=${fail}`)
    send = recv = succ = fail = 0;
    lastTime = Date.now();

    if (Date.now() - errTime > 5000) {
        await Promise.all(Array.from({ length: 4000 }, () => {
            ++send;
            return connect();
        }));
    }
}
main();
setInterval(main, 1000);