const repo = require('@config/repo.json')
const customRepo = require('@config/repo.json')

const getTemplates = () => {
    return {
        ...repo,
        ...customRepo
    }
}

module.exports = {
    getTemplates
}