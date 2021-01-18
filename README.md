# Dio-CLI

> 🛠️选择模板项目下载到本地并且初始化依赖。

## 前言

目前市面上许多流行框架的脚手架如[vue-cli](https://github.com/vuejs/vue-cli)、[create-react-app](https://github.com/facebook/create-react-app)等，都不能直接上手直接开发写业务。大部分项目都需要自己进行一些前置工作，例如二次封装网络请求、按模块进行状态管理、移动端的适配等。为了不进行这些重复性的劳作，自己对此进行了一些必要的技术收敛，由此编写了模板项目放在github仓库中。本脚手架工具的目的是让用户可以通过自定义选项，选择契合的模板项目，快速下载到本地并且自动进行依赖安装。此外，用户也可以通过命令自行添加或删除自己的仓库在其中。

## 安装

```bash
npm install diodark-cli -g
```

## 使用

1. **创建项目**

	```bash
	$ dio create <project-name>
	
	example:
	$ dio create my-project
	```

	> ​	tips：
	>
	> 1.若需要在当前目录下直接创建项目，那么项目名只需要输入`.`，此时项目名为当前目录名;
	> 2.若项目名重名，则需要继续选择覆盖或者取消，`--force`可强行覆盖（谨慎操作）；

2. **查看所有模板（预设模板+自定义模板）**

	```bash
	$ dio list or $ dio ls
	```

3. **新增自定义模板**

	```bash
	$ dio add <name> <url>
	
	example:
	$ dio add vue-admin https://github.com/fanzheming/vue-admin.git#master
	```

	> ​	tips：`#`后需要跟上分支名。

4. **删除自定义模板**

	```bash
	$ dio remove <name>
	
	example:
	$ dio remove vue-admin
	```

	> ​	tips：只可删除自定义模板，预设模板不可删除。

5. **其它**

	```bash
	$ dio --version or dio -V        // 查看版本号
	
	$ dio --help                     // 获取帮助信息
	```

	