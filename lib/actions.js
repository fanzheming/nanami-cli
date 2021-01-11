const path = require('path')
const { promisify } = require('util')
const fs = require('fs-extra')
const program = require('commander')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = promisify(require('download-git-repo'))
const validate = require('validate-npm-package-name')
const shell = require('shelljs')

const { createQuestionList } = require('@config/questions')
const { error, warn, done, info, clearConsole, exit } = require('@utils/common')
const { getTemplates,resolveTemplateKeys } = require('@utils/temp')
const { writePkg } = require('@utils/writeFile')



const spinner = ora()

const testAction = (a) => {
    // process.stdout.write('123')
}


const createAction = async (projectName) => {

    //判断用户输入的项目名是否是. （.表示当前目录）
    const cwd = process.cwd()
    const inCurrent = projectName === '.'
    const name = inCurrent ? path.relative('../', cwd) : projectName
    console.log(name);
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
            await clearConsole()
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
    await clearConsole()

    // 正式开始创建项目
    const templates = getTemplates()
    let templatesKeys = Reflect.ownKeys(templates)

    let firstQuestion = {
        type: 'list',
        name: 'template',
        message: 'Please pick a template:',
        choices: templatesKeys
    }
    createQuestionList.unshift(firstQuestion)

    console.log(chalk.blueBright.dim(`Dio CLI v${require('../package.json').version}`));
    const { template, ...answers } = await inquirer.prompt(createQuestionList)


    // console.log(JSON.stringify(answers, null, '  '));
    await clearConsole()
    console.log('✨',`Creating project in`, `${chalk.yellow.dim(targetDir)}.`);
    spinner.text = 'Initializing template repository...'
    spinner.start()
    try {
        await download(`direct:${templates[template]}`, projectName, { clone: true })
    } catch (err) {
        spinner.stopAndPersist({
            symbol: logSymbols.error,
            text: chalk.redBright.dim('Initialization fail')
        })
        error(err)
        exit(1)
    }
    spinner.stopAndPersist({
        symbol: logSymbols.success,
        text: chalk.greenBright.dim('Initialization successful')
    })
    spinner.text = `Generating ${chalk.yellow.dim('package.json')}...`
    spinner.start()
    // 把用户输入的选项并入项目的package.json
    writePkg(targetDir,answers)
    spinner.stopAndPersist({
        symbol: logSymbols.success,
        text: `${chalk.greenBright.dim('The generation of')} ${chalk.yellow.dim('package.json')} ${chalk.greenBright.dim('successful')}`
    })

}

module.exports = {
    createAction,
    testAction
}