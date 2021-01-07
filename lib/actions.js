const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = require('download-git-repo')
const { createQuestionList } = require('@config/questions.js')
const {getTemplates} = require('@utils/utils.js')
const logger = require('@utils/logger.js')
const program = require('commander')

const chalkAnimation = require('chalk-animation')


const spinner = ora()

const createAction = async (projectName) => {
    const targetDir = path.resolve(process.cwd(),projectName)
    if(!fs.existsSync(targetDir)){
        const templates = getTemplates()
        const templatesKeys = Reflect.ownKeys(templates)
        let firstQuestion = {
            type: 'list',
            name: 'template',
            message: '请选择您需要下载的模板:',
            choices: templatesKeys
        }
        createQuestionList.unshift(firstQuestion)
        console.log(chalk.magenta.dim(`Dio CLI v${require('../package.json').version}`));
        const {template,...answers} = await inquirer.prompt(createQuestionList)
        console.log(JSON.stringify(answers, null, '  '));
        spinner.text = chalk.yellow('拉取模板中...')
        spinner.color = 'yellow';
        
        console.log(chalk.magenta.dim(`正在创建项目 ${targetDir}`));
        spinner.start()
        // download(`direct:${templates[template]}`,projectName,{ clone: true },(err) => {
        //     if(err){
        //         spinner.fail('下载失败')
        //         console.log(err.stack);
        //     } else {
        //         spinner.succeed('下载成功')
        //     }
            
        // })
        
    } else {
        logger.error('当前路径已存在同名目录，请确定后再试')
    }
}

module.exports = {
    createAction
}