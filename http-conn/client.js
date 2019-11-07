const http = require('http');

let succ = 0, fail = 0;

function connect() {
    return new Promise(rs => {
        http.get('http://192.168.2.104:3001', res => {
            res.on('data', v => {
                
            })
            res.on('end', () => {
                ++succ;
                rs();
            })
        }).on('error', e => {
            ++fail;
            rs();
        });
    })
}

async function main() {
    let n = 0;
    succ = 0, fail = 0;
    let startTime = Date.now();
    for (let i = 0; i < 5; ++i) {
        console.log(`Batch ${i}, succ=${succ}, fail=${fail}`);
        await Promise.all(Array.from({ length: 16000 }, () => {
            ++n;
            return connect();
        }));
    }
    let time = Date.now() - startTime;
    console.log('Finish', `${time}ms req=${n} succ=${succ} fail=${fail} qps=${n / time * 1000}`)
}
main();