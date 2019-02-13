const fs = require('fs')
const path = require('path')

// 回调地狱
// setTimeout(function() {
//   // ...
//   setInterval(function() {
//     //发送ajax请求
//     $.ajax({
//       url: '',
//       success: function() {
//         setTimeout(function() {
//           // xxx
//         }, 2000)
//       }
//     })
//   }, 5000)
// }, 2000)

// 1. 创建promise对象时, 必须传入一个回调函数, 否则会报错
// 2. 创建promise对象, 立即就会执行传入的回调函数, 如果想按需执行, 需要将promise的创建封装到一个函数中
// 封装的函数
function readFileByPath(fpath) {
  return new Promise(function (resolve, reject) {
    // 在这里 就可以进行异步任务的执行
    // console.log('promise被执行了!')
    fs.readFile(path.join(__dirname, fpath), function (err, data) {
      // console.log(data.toString())
      // console.log(err)
      if (err) return reject(err)
      resolve(data.toString())
    })
  })
  // return p
}

// fetch.js

// 调用者
// readFileByPath('123.txt').then(function(data) {
//   console.log('这是得到的结果:' + data)
// }, function(err) {
//   console.log('这是错误信息:' + err.message)
// })

// this.$http.get('').then(data=>{}, err=>{})

// setTimeout(function () {
//   console.log(111)
// }, 0)

// console.log(222)

// 1. 学会如何使用promise封装的库 (必须掌握)
// 2. 学会自己封装一个promise的函数 (最好能掌握)

readFileByPath('1.txt')
  .then(data => {
    console.log('我是第一个.then', data)
    return readFileByPath('2.txt')
  })
  .then(data => {
    console.log('我是第二个.then', data)
    return readFileByPath('3.txt')
  })
  .then(data => {
    console.log('我是第三个.then', data)
  })
  .catch(err => {
    console.log(err.message)
  })
  .finally(() => {
    console.log('不管出不出异常, 最终都会执行的哦!')
  })

// readFileByPath('2.txt')
//   .then(data => {
//     console.log(data)
//   })

// readFileByPath('3.txt')
//   .then(data => {
//     console.log(data)
//   })