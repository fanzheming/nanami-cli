#!/usr/bin/env node
//向shell说明要用node解释器去执行此文件

// 在最开始注册目录别名 配置在package.json中
require('module-alias/register')
const program = require('@lib/createCommander.js')
const createOptions = require('@lib/options.js')
const createCommands = require('@lib/commands.js')

// 创建选项
createOptions()
// 创建命令
createCommands()
 // 在最后解析输入的命令
program.parse(process.argv)
