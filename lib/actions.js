const path = require('path')
const { promisify } = require('util')
const fs = require('fs-extra')
const program = require('commander')
const inquirer = require('inquirer')
const spinner = require('ora')()
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = promisify(require('download-git-repo'))
const validate = require('validate-npm-package-name')
const shell = require('shelljs')

const { createQuestionList } = require('@config/questions')
const { error, warn, done, info, clearConsole, exit } = require('@utils/common')
const { getRepositories } = require('@utils/repository')
const { writePkg } = require('@utils/writeFile')
const { installDeps } = require('@utils/installDeps')

exports.testAction = (a) => {
    // process.stdout.write('123')
}

exports.createAction = async (projectName) => {
    //判断用户输入的项目名是否是. （.表示当前目录）
    const cwd = process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    const targetDir = path.resolve(cwd, projectName || '.')

    // 检查npm包名是否合法
    const { validForNewPackages, errors, warnings } = validate(name)

    // 如果不是合法npm包名，则退出程序
    if (!validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`))
        errors && errors.forEach(err => {
            error(err)
        })
        warnings && warnings.forEach(warn => {
            error(warn)
        })
        exit(1)
    }

    // 判断文件夹是否存在
    if (fs.existsSync(targetDir)) {
        if (program.force) {
            await fs.remove(targetDir)
        } else {
            clearConsole()
            if (inCurrent) {
                const { ok } = await inquirer.prompt([
                    {
                        name: 'ok',
                        type: 'confirm',
                        message: `Generate project in current directory?`
                    }
                ])
                if (!ok) {
                    return
                }
            } else {
                const { action } = await inquirer.prompt([
                    {
                        name: 'action',
                        type: 'list',
                        message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
                        choices: [
                            { name: 'Overwrite', value: 'overwrite' },
                            { name: 'Cancel', value: false }
                        ]
                    }
                ])
                if(!action){
                    return
                } else if(action === 'overwrite') {
                    spinner.text = `Removing ${chalk.cyan(targetDir)}...`
                    spinner.start()
                    await fs.remove(targetDir)
                    spinner.stopAndPersist({
                        symbol: logSymbols.success,
                        text: chalk.greenBright.dim('Remove success')
                    })
                }
            }

        }
    }
    clearConsole()

    // 正式开始创建项目
    // step 1: 取得仓库配置组合成命令行交互问题选项
    const repositories = getRepositories()
    let repositoriesKeys = Reflect.ownKeys(repositories)

    let firstQuestion = {
        type: 'list',
        name: 'boilerplate',
        message: 'Please pick a boilerplate:',
        choices: repositoriesKeys
    }
    createQuestionList.unshift(firstQuestion)
    console.log(chalk.blueBright.dim(`Dio CLI v${require('../package.json').version}`));
    const { boilerplate, ...answers } = await inquirer.prompt(createQuestionList)

    clearConsole()

    // step 2: 从git下载对应模板
    console.log('✨',`Creating project in`, `${chalk.yellow.dim(targetDir)}.`);
    spinner.text = 'Downloading boilerplate from repository...'
    spinner.start()
    try {
        await download(`direct:${repositories[boilerplate]}`, projectName, { clone: true })
    } catch (err) {
        spinner.stopAndPersist({
            symbol: logSymbols.error,
            text: chalk.redBright.dim('Download boilerplate failed')
        })
        error(err)
        exit(1)
    }
    spinner.stopAndPersist({
        symbol: logSymbols.success,
        text: chalk.greenBright.dim('Download boilerplate successful')
    })

    // step 3: 把命令行交互时用户的输入写入项目原有的package.json
    spinner.text = `Reconfiguring ${chalk.yellow.dim('package.json')}...`
    spinner.start()
    writePkg(targetDir,answers)
    spinner.stopAndPersist({
        symbol: logSymbols.success,
        text: `${chalk.greenBright.dim('Reconfigure')} ${chalk.yellow.dim('package.json')} ${chalk.greenBright.dim('successful')}`
    })

    // step 4 : 初始化项目依赖
    if(!inCurrent){
        shell.cd(name)
    }
    await installDeps()

    clearConsole()

    // step 5 : 提示打开项目
    console.log(chalk.magenta.dim(`Successfully created project ${chalk.yellow(name)}.`))
    console.log(chalk.magenta.dim(`Get opened by vscode with the following commands:\n\n` +
    (inCurrent ? '' : chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`)) +
    chalk.cyan(` ${chalk.gray('$')} code .`)))

}

exports.listAction = () => {
    console.log('\r')
    const data = getRepositories()
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