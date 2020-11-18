var xlsx = require('node-xlsx').default;
const fs = require('fs')
const localeZh = require('./locale/zh')
// 从 ./locale/zh 中的json文件生成一个 ./excel/zh.xlsx 表格文件
let datas = []
for (let attr in localeZh) {
    const curPage = {
        name: attr,
        data: enCodeObj(attr, localeZh[attr])
    }
    datas.push(curPage)
}

const buffter = xlsx.build(datas)

fs.writeFileSync('./excel/zh.xlsx', buffter, 'binary')
console.log('编译成功')



function enCodeObj (base = 'common',obj, arr = []) {
    for (let attr in obj) {
        const item = obj[attr]
        if (typeof item === 'string') {
            arr.push([`${base}.${attr}`, item])
        } else {
            arr.push(...enCodeObj(`${base}.${attr}`, item))
        }
    }
    return arr
}