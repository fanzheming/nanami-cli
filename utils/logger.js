
const chalk = require('chalk')
const logSymbols = require('log-symbols');

class Logger {

    error(content){
        console.log(logSymbols.error,chalk.red(content));
    }
}


module.exports = new Logger()