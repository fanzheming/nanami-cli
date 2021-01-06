const { createCommand } = require('commander');
const program = createCommand();

// -V或--version输出版本号
program.version(require('../package.json').version)

module.exports = program