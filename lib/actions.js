const path = require('path')
const shell = require('shelljs')
const {promisify} = require('util')
const fs = require('fs-extra')
const program = require('commander')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = promisify(require('download-git-repo'))
const validate = require('validate-npm-package-name')

const { createQuestionList } = require('@config/questions')
const { logError, logWarn, logSuccess, logInfo, exit , getTemplates } = require('@utils/common')


const spinner = ora()

const testAction = (a) => {
    // process.stdout.write('123')
}


const createAction = async (projectName, { force = false }) => {

    //判断用户输入的项目名是否是. （表示当前目录）
    const cwd =  process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    const targetDir = path.resolve(cwd, projectName || '.')

    // 检查npm包名是否合法
    const { validForNewPackages, errors, warnings } = validate(name)

    // 如果不是合法npm包名，则退出程序
    if (!validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${name}"`))
        errors && errors.forEach(err => {
            logError(err)
        })
        warnings && warnings.forEach(warn => {
            logWarn(warn)
        })
        exit(1)
    }

    // 判断文件夹是否存在
    if (fs.existsSync(targetDir)) {
        if (program.force) {
            await fs.remove(targetDir)
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
            if (action === 'overwrite') {
                spinner.text = `Removing ${chalk.cyan(targetDir)}...`
                spinner.start()
                await fs.remove(targetDir)
                spinner.stopAndPersist({
                    symbol: logSymbols.success,
                    text: chalk.greenBright.dim('Remove success')
                })
            } else {
                exit()
            }
        }
    }
    // if (process.stdout.isTTY) {
    //     // readline.cursorTo(process.stdout, 0, 0)
    //     readline.clearScreenDown(process.stdout)
    // }

    // 下载模板
    // const templates = getTemplates()
    // const templatesKeys = Reflect.ownKeys(templates)
    // let firstQuestion = {
    //     type: 'list',
    //     name: 'template',
    //     message: 'Please pick a template:',
    //     choices: templatesKeys
    // }
    // createQuestionList.unshift(firstQuestion)

    // console.log('\n',chalk.blueBright.dim(`Dio CLI v${require('../package.json').version}`));
    // const { template, ...answers } = await inquirer.prompt(createQuestionList)
    // console.log(JSON.stringify(answers, null, '  '));
    // console.log('✨',`Creating project in`, `${chalk.yellow.dim(targetDir)}.`);
    // spinner.text = 'Initializing git repository...'
    // spinner.start()
    // try {
    //     await download(`direct:${templates[template]}`, projectName, { clone: true })
    // } catch (error) {
    //     spinner.stopAndPersist({
    //         symbol: logSymbols.error,
    //         text: chalk.redBright.dim('Initializing fail')
    //     })
    //     logError(derr)
    // }
    // spinner.stopAndPersist({
    //     symbol: logSymbols.success,
    //     text: chalk.greenBright.dim('Initializing success')
    // })
}

module.exports = {
    createAction,
    testAction
}