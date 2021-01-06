const program = require('@lib/createCommander.js')
const {createAction} = require('@lib/actions.js')

// 创建命令
const createCommands = () => {
    // 新建项目
    program
        .command('create <project-name>')
        .alias('c')
        .description('新建项目的命令')
        .action(projectName => {
            createAction(projectName)
        })

}

module.exports = createCommands