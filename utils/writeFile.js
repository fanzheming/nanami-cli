const path = require('path')
const fs = require('fs-extra')
const {error,exit} = require('@utils/common')


exports.writePkg = (targetDir,answers) => {
    const pkgPath = path.join(targetDir,'package.json') 
    if(!fs.existsSync(pkgPath)){
        error('Can not find package.json, please check template repository')
        return
    }
    const data = Object.assign(fs.readJsonSync(pkgPath),answers)
    fs.writeJSONSync(pkgPath,data,{spaces:'\t'})
}

exports.writeCustomRepo = (data) => {
    const filepath = path.resolve(__dirname,'../config/custom-repo.json')
    fs.writeJSONSync(filepath,data,{spaces:'\t'})
}

exports.removeOneInCustomRepo = (name) => {
    const filepath = path.resolve(__dirname,'../config/custom-repo.json')
    const data = fs.readJsonSync(filepath)
    Reflect.deleteProperty(data,name)
    fs.writeJSONSync(filepath,data,{spaces:'\t'})
}