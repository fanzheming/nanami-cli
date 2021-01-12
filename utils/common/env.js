const path = require('path')
const shell = require('shelljs')
const fs = require('fs-extra')

exports.getPackageManager = () => {
    return shell.which('yarn') ? 'yarn': 'npm'

}

const hasYarn = () => {
    return shell.which('yarn')
}

exports.hasProjectYarn = () => {
    const lockFile = path.join(process.cwd(),'yarn.lock')
    const result = fs.existsSync(lockFile)
    if (result && !hasYarn()) throw new Error(`Package manager of the boilerplate is yarn, suggest you install it : npm install yarn -g`)
}