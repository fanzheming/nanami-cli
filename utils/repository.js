const repo = require('@config/repo.json')
const customRepo = require('@config/repo.json')

exports.getRepositories = () => {
    return {
        ...repo,
        ...customRepo
    }
}