const http = require('http');

let connNum = 0;

function connect() {
    return new Promise(rs => {
        let req = http.get('http://192.168.2.104:3001', res => {
            res.on('data', v => {
                if (v.toString() === 'ok') {
                    ++succ;
                    rs();
                }
            })

            res.on('close', () => {
                ++fail;
                rs();
            })
        });

        req.on('error', e => {
            console.log('ReqERR', e);
            ++fail;
            rs();
        });
    })
}

let succ, fail;
async function main() {
    succ = 0;
    fail = 0;
    let n = 0;
    let startTime = Date.now();
    for (let i = 0; i < 100; ++i) {
        console.log('Batch ' + i)
        await Promise.all(
            Array.from({ length: 100 }, () => {
                ++n;
                return connect();
            })
        )
    }

    let time = Date.now() - startTime;
    console.log('Finish', `${time}ms req=${n} succ=${succ} fail=${fail} q=${n} qps=${n / time * 1000}`)
}
main();