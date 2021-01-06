const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const { createQuestionList } = require('@config/questions.js')
const {getTemplates} = require('@utils/utils.js')
const logger = require('@utils/logger.js')
const program = require('@lib/createCommander.js')

const createAction = async (projectName) => {
    const targetDir = path.resolve(process.cwd(),projectName)
    console.log(targetDir);
    console.log(fs.existsSync(targetDir))
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
        const answers = await inquirer.prompt(createQuestionList)
        console.log(JSON.stringify(answers, null, '  '));
    } else {
        logger.error('当前路径已存在同名目录，请确定后再试')
    }
}

module.exports = {
    createAction
}