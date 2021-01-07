#!/usr/bin/env node
//向shell说明要用node解释器去执行此文件

// 在最开始注册目录别名 配置在package.json中
require('module-alias/register')
const program = require('@utils/commander')
const { createAction, testAction } = require('@lib/actions.js')
const emoji = require('node-emoji');
const chalk = require('chalk')

program
    .version('1.0.0')
    .name('dio')
    .usage('<command> [options]')
    .description(chalk.yellowBright.dim(`${emoji.get(':star:')} List options and commands of Dio CLI`))
    .option('-d, --dest <dest>', 'set target diectory')
    .option('-f, --force', 'force excute')
    .on('--help', () => {
        console.log('\n', emoji.get(':coffee:'), chalk.yellowBright.dim('Let\'s take a break'))
    })

// 新建项目
program
    .command('create <project-name>')
    .alias('c')
    .description('create a new project')
    .action(createAction)

// 新建项目
program
    .command('test <a>')
    .description('测试')
    .action(testAction)

// 在最后解析输入的命令
program.parse(process.argv)
