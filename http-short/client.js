const http = require('http');

const rightData = 'xxx'.repeat(1);

let succ = 0, fail = 0;

function connect() {
    return new Promise(rs => {
        http.get('http://192.168.2.104:3001', res => {
            let data = '';
            res.on('data', v => {
                data += v.toString();

                if (data == rightData) {
                    ++succ;
                }
                else {
                    ++fail;
                }
            })
            res.on('end', () => {
                rs();
            })
        }).on('error', e => {
            ++fail;
            rs();
        });
    })
}

async function t() {
    let n = 0;
    succ = 0, fail = 0;
    let startTime = Date.now();
    for (let i = 0; i < 100; ++i) {
        console.log('Batch ' + i);
        await Promise.all(Array.from({ length: 100 }, () => {
            ++n;
            return connect();
        }));
    }
    let time = Date.now() - startTime;
    console.log('Finish', `${time}ms req=${n} succ=${succ} fail=${fail} qps=${n / time * 1000}`)
}
t();