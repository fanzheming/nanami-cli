const shell = require('shelljs')
const spinner = require('ora')()
const logSymbols = require('log-symbols')
const chalk = require('chalk')
const { hasProjectYarn } = require('./common/env')


exports.installDeps = async () => {
    spinner.text = 'Initializing dependencies...'
    spinner.start()
    const packageManager = hasProjectYarn() ? 'yarn' : 'npm'
    await execInstallCommand(`${packageManager} install`)
    spinner.stopAndPersist({
        symbol: logSymbols.success,
        text: `${chalk.greenBright.dim('Initialization dependencies complete')}`
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