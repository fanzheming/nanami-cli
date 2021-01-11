
const chalk = require('chalk')
const logSymbols = require('log-symbols');

exports.error = msg => {
    console.error(logSymbols.error, chalk.redBright.dim(msg))
    if (msg instanceof Error) {
        console.error(msg.stack)
    }
}

exports.warn = msg => {
    console.warn(logSymbols.warning, chalk.yellowBright.dim(msg))
}

exports.done = msg => {
    console.info(logSymbols.success, chalk.greenBright.dim(msg))
}

exports.info = msg => {
    console.info(logSymbols.info, chalk.whiteBright.dim(msg))
}

exports.clearConsole = title => {
    if (process.stdout.isTTY) {
        const blank = '\n'.repeat(process.stdout.rows)
        console.log(blank)
        readline.cursorTo(process.stdout, 0, 0)
        readline.clearScreenDown(process.stdout)
        if (title) {
            console.log(title)
        }
    }
}