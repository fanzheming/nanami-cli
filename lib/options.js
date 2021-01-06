const program = require('@lib/createCommander.js')

// 创建选项
const createOptions = () => {
    program
        .option('-d, --dest <dest>', '目标目录')
        .on('--help', () => {
            console.log('\n\r使用愉快！')
        })
}

module.exports = createOptions