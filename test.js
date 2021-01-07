const value = '506954808@qq.com'
const res = /(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|(^$)/.test(value)
console.log(res);