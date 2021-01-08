// 出口
[
    'exit',
    'logger',
    'temp'
].forEach(m => {
    Object.assign(exports, require(`./${m}`))
})