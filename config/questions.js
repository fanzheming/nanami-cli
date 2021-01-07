const createQuestionList = [
    {
        type: 'input',
        name: 'version',
        message: '请输入版本号:',
        default: '1.0.0',
    },
    {
        type: 'input',
        name: 'author',
        message: '作者:',
        default: '',
    },
    {
        type: 'input',
        name: 'mail',
        message: '邮箱:',
        validate: function (value) {
            const pass = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|(^$)/.test(value)
            if (pass) {
                return true
            }
            return '您输入的邮箱不符合规则！';
        },
        default: '',
    },
    {
        type: 'input',
        name: 'description',
        message: '请输入项目简介:',
        default: 'project created by dio-cli',
    }
]

module.exports = {
    createQuestionList
}