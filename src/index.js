#!/usr/bin/env node
//向shell说明要用node解释器去执行此文件

// 在最开始注册目录别名 配置在package.json中
require('module-alias/register')
const program = require('commander')
const { createAction, testAction } = require('@lib/actions.js')
const chalk = require('chalk')

program
    .version(`dio-cli ${require('../package').version}`)
    .name('dio')
    .usage('<command> [options]')
    .description('create a new project by dio-cli')
    .option('-d, --dest <dest>', 'set target diectory')
    .option('-f, --force', 'Overwrite target directory if it exists')

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
