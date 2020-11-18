const Xlsx = require('node-xlsx')
const fs = require('fs')
const data = Xlsx.parse(fs.readFileSync('./excel/zh.xlsx'))
// 从 ./excel/en.xlsx 解析成对应的json文件
var obj = {}
const baseDir = './locale/en/modules'
data.forEach(locale => {
    obj = decode(locale.data, obj)
})

for (let attr in obj) {
    const dir =  baseDir + '/' + attr + '.json'
    fs.writeFileSync(dir, JSON.stringify(obj[attr]))
}
console.log('解析成功')


function decode (data, obj={}) {
    data.forEach(row => {
        const [key, value] = row
        const path = key.split('.')
        if (path.length === 1) {
            obj[path[0]] = value
        } else {
           obj = Object.assign(obj, getChildObj(path, value, obj))
        }
    })
    return obj
}


function getChildObj (arr=[], value = '', obj = {}) {
    if (arr.length === 1) {
        obj[arr[0]] = value
    } else {
        if (!obj[arr[0]]) {
            obj[arr[0]] = {}
        }
        getChildObj(arr.slice(1), value, obj[arr[0]])
    }
    return obj
}