// console.log(process.stdout.rows)

// const blank = '\n'.repeat(process.stdout.rows)
// console.log(blank)

// const readline = require('readline');
// readline.cursorTo(process.stdout, 10, 2);
// const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
// });
// rl.write('我在这！！！');


// const readline = require('readline');

// process.stdout.write('1111')
// const blank = '\n'.repeat(process.stdout.rows)
//         console.log(blank)
//         readline.cursorTo(process.stdout, 0, 0)
//         readline.clearScreenDown(process.stdout)
// process.stdout.write('222')

// const shell = require('shelljs')
// shell.cd('test01')
// console.log(shell.pwd());
// const str = 'WARNING1'
// const a = /warning/i.test(str)
// console.log(a);

// function line (str, len) {
//     console.log(new Array(Math.max(1, len - str.length)));
//     var line = new Array(Math.max(1, len - str.length)).join('-');
//     return line;
// }
// console.log(line('xxxxx',9));
const data = require('./config/repo.json')
const test = () => {
    const maxLength = Math.max(...Object.keys(data).map(key => key.length))
    for (const [key, value] of Object.entries(data)) {
        const length = key.length
        if(length < maxLength) {
            console.log(key + ' ' + '-'.repeat(maxLength-length) + '--- ' + value)
        } else {
            console.log(key + ' --- ' + value)
        }
    }
}
test()