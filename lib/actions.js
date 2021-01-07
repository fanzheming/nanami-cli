const path = require('path')
const fs = require('fs-extra')
const program = require('@utils/commander')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = require('download-git-repo')
const validate = require('validate-npm-package-name')

const { createQuestionList } = require('@config/questions')
const { getTemplates } = require('@utils/utils')
const { logError, logWarn, logSuccess, logInfo } = require('@utils/logger')


const spinner = ora()

const testAction = (a) => {
    logError('123')
    logWarn('123')
    logSuccess('123')
    logInfo('123')
}


const createAction = async (projectName,{force = false}) => {

    // 检查npm包名是否合法
    const { validForNewPackages, errors, warnings } = validate(projectName)

    // 如果不是合法npm包名，则退出程序
    if (!validForNewPackages) {
        logError(`不合法的项目名: "${projectName}"`)
        errors && errors.forEach(err => {
            logError(err)
        })
        warnings && warnings.forEach(warn => {
            logWarn(warn)
        })
        process.exit(1)
    }

    const targetDir = path.resolve(process.cwd(), projectName)
    // 判断文件夹是否存在
    if (fs.existsSync(targetDir)) {
        if (program.force) {
            try {
                await fs.remove(targetDir)
            } catch (error) {
                logError(`删除 ${chalk.cyan(targetDir)} 失败`)
                console.error(error)
                process.exit(1)
            }
            
        }else {
            const { isOverwrite } = await inquirer.prompt([
                {
                    name: 'isOverwrite',
                    type: 'list',
                    message: `目标文件夹 ${chalk.cyan(targetDir)} 已经存在，是否覆盖：`,
                    choices: [
                        { name: '确认', value: true },
                        { name: '取消', value: false }
                    ]
                }
            ])
            if (isOverwrite) {
                logInfo(`正在删除 ${chalk.cyan(targetDir)} ...`)
                try {
                    await fs.remove(targetDir)
                    logSuccess('删除成功')
                } catch (error) {
                    logError(`删除 ${chalk.cyan(targetDir)} 失败`)
                    console.error(error)
                    process.exit(1)
                }
            }
        }
    }

    // 删除上面promt的提示

    // 下载模板
    // const templates = getTemplates()
    // const templatesKeys = Reflect.ownKeys(templates)
    // let firstQuestion = {
    //     type: 'list',
    //     name: 'template',
    //     message: '请选择您需要下载的模板:',
    //     choices: templatesKeys
    // }
    // createQuestionList.unshift(firstQuestion)
    // console.log(chalk.magenta.dim(`Dio CLI v${require('../package.json').version}`));
    // const { template, ...answers } = await inquirer.prompt(createQuestionList)
    // console.log(JSON.stringify(answers, null, '  '));
    // spinner.text = chalk.yellow('拉取模板中...')
    // spinner.color = 'yellow';

    // console.log(chalk.magenta.dim(`正在创建项目 ${targetDir}`));
    // spinner.start()
    // download(`direct:${templates[template]}`,projectName,{ clone: true },(err) => {
    //     if(err){
    //         spinner.fail('下载失败')
    //         console.log(err.stack);
    //     } else {
    //         spinner.succeed('下载成功')
    //     }

    // })
}

module.exports = {
    createAction,
    testAction
}