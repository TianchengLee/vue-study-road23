## vueday08 ##

### babel的配置 ###

1. 安装babel的核心包和loader, 和语法预设

	由于babel7目前使用还有很多问题

	所以选择使用babel6

	babel-preset-env 核心语法包

	babel-preset-stage-0 ES2015的语法包合集

		npm i babel-loader@7 babel-core babel-preset-env babel-preset-stage-0 -D

2. 配置loader

		module: {
		  rules: [
		    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		  ]
		}

3. 配置babel

	在.babelrc中进行配置

		{
		  "presets": ["env", "stage-0"]
		}

### vue-loader的配置 ###

总结梳理： webpack 中如何使用 vue :

1. 安装vue的包：  cnpm i vue -S
2. 由于 在 webpack 中，推荐使用 .vue 这个组件模板文件定义组件，所以，需要安装 能解析这种文件的 loader    cnpm i vue-loader vue-template-complier -D
+ 配置vue-loader
+ 安装VueLoaderPlugin在webpack.config.js文件中
3. 在 main.js 中，导入 vue 模块  import Vue from 'vue'
4. 定义一个 .vue 结尾的组件，其中，组件有三部分组成： template script style
5. 使用 import login from './login.vue' 导入这个组件
6. 创建 vm 的实例 var vm = new Vue({ el: '#app', render: c => c(login) })
7. 在页面中创建一个 id 为 app 的 div 元素，作为我们 vm 实例要控制的区域；


### CommonJS模块化规范 ###

导入:

	require()

导出:

	module.exports = {}

### ES6模块化规范 ###

1. 导入(可以导入js/css等其他文件):

	导入js:
	
		import 变量名 from 包名/路径
	
	导入css:
	
		import 路径

2. 导出

	export

	export default {}

### vue-cli 脚手架 ###

由Vue官方提供的一键生成webpack工程化模板项目

目前最新的版本是v3.0, 18年8月份发布的正式版

我自己电脑中安装的是v2.9.6

1. 全局安装vue-cli

	注意: vue-cli包最新的版本是v2.9.6, 如果需要安装v3.0以后的版本, 包名更换为了 @vue/cli 自行去官网查阅文档

		npm i vue-cli -g

2. 执行vue init初始化创建一个项目

		vue init webpack vue-cli-demo

3. 配置项目

		? Project name vue-cli-demo
		? Project description 这是一个牛逼的vue项目
		? Author TianchengLee <ltc6634284@gmail.com>
		? Vue build runtime
		? Install vue-router? Yes
		? Use ESLint to lint your code? No
		? Pick an ESLint preset Standard
		? Set up unit tests No
		? Setup e2e tests with Nightwatch? No
		? Should we run `npm install` for you after the project has been created? (recommended) npm

4. 当配置好后立即会开始使用npm装包

	由于速度较慢, 建议 ctrl + c 停止

	重新使用yarn或cnpm等工具进行安装会更快

		cd vue-cli-demo
		cnpm i

