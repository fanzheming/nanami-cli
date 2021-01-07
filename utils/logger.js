
const chalk = require('chalk')
const logSymbols = require('log-symbols');


const logError = (content) => {
    console.error(logSymbols.error, chalk.redBright.dim(content));
}

const logWarn = (content) => {
    console.warn(logSymbols.warning, chalk.yellowBright.dim(content));
}

const logSuccess = (content) => {
    console.info(logSymbols.success, chalk.greenBright.dim(content));
}

const logInfo = (content) => {
    console.info(logSymbols.info, chalk.whiteBright.dim(content));
}


module.exports = {
    logError,
    logWarn,
    logSuccess,
    logInfo
}