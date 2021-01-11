const chalk = require('chalk')
const repo = require('@config/repo.json')
const customRepo = require('@config/repo.json')

const getTemplates = () => {
    return {
        ...repo,
        ...customRepo
    }
}
const resolveTemplateKeys = (templatesKeys) => {
    return templatesKeys.map((tk)=>{
        if(tk.indexOf('(') === -1) return tk
        const pattern = /(?<g1>\w+)\((?<g2>\w+)\)/s
        const {g1,g2}  = tk.match(pattern).groups
        return `${g1}(${chalk.yellow(g2)})`
    })
}
module.exports = {
    getTemplates,
    resolveTemplateKeys
}