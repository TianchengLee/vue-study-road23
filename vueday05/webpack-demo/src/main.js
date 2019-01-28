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

$(function () {
  $('li:odd').css('backgroundColor', 'blue')
  $('li:even').css('backgroundColor', function () {
    return '#' + 'baa119'
  })
})
