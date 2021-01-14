const repo = require('@config/repo.json')
const customRepo = require('@config/custom-repo.json')

exports.getRepositories = () => {
    return {
        ...repo,
        ...customRepo
    }
}