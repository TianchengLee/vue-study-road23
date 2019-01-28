// 模块对外暴露的默认成员, 一个模块只能对外暴露一次export default
// export default 
// 无需在导出的时候起名字. 导入时通过import xxx语法来起名
export default {
  a: 1,
  b: 2
}

// export
// 按需导出
export const name = '素馅熊'
export const gender = 'female'

// import xxx from './m1.js'