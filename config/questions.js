const createQuestionList = [
    {
        type: 'input',
        name: 'author',
        message: '作者:',
        default: 'fanzheming',
    },
    {
        type: 'input',
        name: 'mail',
        message: '邮箱:',
        validate: function (value) {
            var pass = value.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)
            if (pass) {
                return true
            }
            return '您输入的邮箱不符合规则！';
        },
        default: '506954808@qq.com',
    },
    {
        type: 'input',
        name: 'description',
        message: '描述:',
        default: '',
    }
]

module.exports = {
    createQuestionList
}