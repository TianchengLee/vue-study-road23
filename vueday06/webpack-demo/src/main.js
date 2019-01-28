// 这是 main.js 是我们项目的JS入口文件

// 1. 导入 Jquery
// import *** from *** 是ES6中导入模块的方式
// 由于 ES6的代码，太高级了，浏览器解析不了，所以，这一行执行会报错
import $ from 'jquery'
// const $ = require('jquery')

// 转译工具 babel 将所有ES6的语法  转换成ES5  为了浏览器兼容性

import './css/index.css'
import './css/index.less'
import './css/index.scss'

import 'bootstrap/dist/css/bootstrap.css'

// 直接引入的vue是runtime的vue文件, 该文件如果要渲染组件, 必须使用render函数
// import Vue from 'vue/dist/vue.js'
import Vue from 'vue'

// 如果使用render函数结合runtime-only模式的vue文件
// 模板对象必须在外面用 .vue 文件定义好然后倒入进来
// let login = {
//   template: '<h1>login组件</h1>'
// }

import login from './login.vue'

new Vue({
  el: '#app',
  data: {
    msg: '素馅熊'
  },
  render: c => c(login),
  // components: {
  //   login
  // }
})

class Person {
  static info = {
    name: '素馅熊',
    age: 18
  }
}

console.log(Person.info)


import xxx from './m1.js'
console.log(xxx)

// 导入的数据 都是只读的, 不可修改
import { name, gender as g } from './m1.js'
// 如果需要修改, 可以在本地先另存一个变量 再修改新的变量
// let n = name
console.log(name, g)


$(function () {
  $('li:odd').css('backgroundColor', 'blue')
  $('li:even').css('backgroundColor', function () {
    return '#' + 'baa119'
  })
})
