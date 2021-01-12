const shell = require('shelljs')
const {spawn} = require('child_process')
const spinner = require('ora')()
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const { hasProjectYarn } = require('./common/env')


exports.installDeps = async () => {
    spinner.text = 'Initializing dependency package...'
    spinner.start()
    const packageManager = hasProjectYarn() ? 'yarn' : 'npm'
    const {stderr} = await execInstallCommand(`${packageManager} install`)
    if(stderr){
        spinner.stopAndPersist({
            symbol: logSymbols.error,
            text: `${chalk.redBright.dim('Initialization dependency package failed')}`
        })
        return
    }
    spinner.stopAndPersist({
        symbol: logSymbols.success,
        text: `${chalk.greenBright.dim('Initialization dependency package successful')}`
    })
}

const execInstallCommand = (command) => {
    return new Promise((resolve,reject)=>{
        //silent:true 不输出执行命令后的内容到控制台
        shell.exec(command, {silent:true},(code, stdout, stderr) => {
            if (code !== 0) {
                reject(`command failed:${command}`)
                return
            }
            resolve({stdout,stderr})
        })
    })
    


}