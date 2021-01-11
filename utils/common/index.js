// 出口
[
    'exit',
    'logger'
].forEach(m => {
    Object.assign(exports, require(`./${m}`))
})