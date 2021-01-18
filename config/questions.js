exports.createQuestionList = [
    {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '1.0.0',
    },
    {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: '',
    },
    {
        type: 'input',
        name: 'mail',
        message: 'Mail:',
        validate: function (value) {
            const pass = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|(^$)/.test(value)
            if (pass) {
                return true
            }
            return 'Please input right mail address!';
        },
        default: '',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description',
        default: `project created by ${require('../package.json').name}`,
    }
]