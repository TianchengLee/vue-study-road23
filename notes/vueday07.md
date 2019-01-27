## vue day07 ##

### 简介 ###

四个核心概念:

1. 入口
2. 输出
3. loaders (加载器)
4. plugins (插件)

### webpack基本使用 ###

webpack官方有两种用法:

1. 终端使用(需要全局安装webpack)
2. Node.js的配置文件(可以全局安装也可以在项目中安装)

以下是终端使用的方式, 学习阶段可以尝试一下:

1. 全局安装webpack(不推荐)

		npm i webpack webpack-cli -g

2. 调用webpack指令打包编译js文件

	在webpack4中必须通过`-o`手动指定output

	webpack后第一个参数是入口文件(要打包的文件)

	-o 表示output, 即输出文件

	-d 表示development, 即开发模式, 不压缩混淆

	-p 表示production, 即生产模式, 开启压缩混淆

	如果不指定-d或-p, 则默认使用 -p 开启压缩混淆并在控制台给出警告提示

		webpack ./src/main.js -o ./dist/bundle.js -d

**注意: 在控制台中使用webpack不是其官方推荐的方法, 所以可以不需要全局安装webpack, 学习阶段使用一下即可**

以下是配置文件的使用方式:

此方式不需要全局安装webpack, 但是需要在每个项目中的开发依赖安装webpack和webpack-cli

1. 安装webpack和webpack-cli

		npm i webpack webpack-cli -D

2. 在项目根目录下新建`webpack.config.js`的配置文件, 进行基本配置(入口和输出)

		const path = require('path');

		module.exports = {
		  entry: './src/main.js', // entry是指定打包文件的入口, 可以使用相对路径
		  output: {
		    path: path.join(__dirname, 'dist'), // output是指输出的目录, 必须是绝对路径
		    filename: 'bundle.js'
		  },
		  mode: 'development'
		}

3. 在package.json中的scripts节点下, 可以编写一些项目中用的脚本, 在这个地方可以执行项目依赖的指令, 不需要全局安装, 只需要本地安装即可
		
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1",
			"build": "webpack"
		},

4. 当配置好scripts之后, 就可以运行`npm run build`进行项目打包了

		npm run build

### webpack-dev-server的使用 ###

以下简称devServer

出现的目的是因为每次修改了文件后, 都需要手动运行`npm run build`或者全局执行`webpack`指令重新编译打包

在开发阶段修改代码, 是非常频繁的一个操作, 如果每次修改完代码不能用最高效的方式查看结果, 那么开发起来体验非常不好

所以devServer出现的目的就是为了解决上述问题的, 当开发者修改完代码后自动编译打包, 刷新浏览器, 提高开发效率!!!

1. 安装`webpack-dev-server`包在项目的开发依赖

		npm i webpack-dev-server -D

	在安装devServer时, 可能会出现如下警告:

		npm WARN webpack-dev-server@3.1.14 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
		npm WARN webpack-dev-middleware@3.4.0 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies
		yourself.

	**注意: 如果在项目的开发依赖中没有安装 `webpack@^4.0.0` 就会产生以上警告, 发现了该警告一定要注意安装 `webpack`**

		npm i webpack webpack-cli -D

	如果开始就没有安装webpack在开发依赖, 则可以一次性一起安装

		npm i webpack-dev-server webpack webpack-cli -D

2. 在`package.json`的`scripts`节点下新建一个脚本

		"scripts": {
		    "test": "echo \"Error: no test specified\" && exit 1",
		    "dev": "webpack-dev-server",
		    "build": "webpack"
		  },

3. 可以直接在终端运行`npm run dev`开启devServer

		npm run dev

devServer的原理其实是, 在运行的第一次时将入口文件打包编译, 把最终编译的结果放到内存中, 挂载到服务器的根目录下与输出文件名同名的文件, 将来只要代码改变, devServer会自动把结果编译到内存中的输出文件, 同时自动刷新浏览器

#### devServer的参数 ####

默认开启devServer不会自动打开浏览器, 而且采用的是8080端口, 默认devServer托管的是项目根目录, 而index.html在src目录, 每次修改代码后都会重新编译生成完整的bundle.js

以上问题都可以通过指定不同的参数来解决

1. 自动打开浏览器

		--open

2. 设置服务器端口

		--port <端口号>
		--port 3000

3. 设置默认托管的目录

		--contentBase <路径>
		--contentBase ./src

4. 开启热替换模块

		--hot

只需要在scripts中的脚本后加上以上参数即可:

	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"dev": "webpack-dev-server --port 3000 --open --contentBase ./src --hot",
		"build": "webpack"
	},

设置devServer参数的第二种方式

修改配置文件:

1. 导入webpack

		// 热模块替换的插件  HMR  在webpack中内置了
		const webpack = require('webpack')

2. 配置devServer节点

		devServer: {
		    contentBase: "./src", // 托管的根目录
		    hot: true, // 我要开启或关闭HMR
		    open: true, // 自动打开浏览器
		    port: 3000 // 设置devServer的端口号
		  },

3. 如果想开启HMR(热模块替换) 还需要安装一个插件
	
		  plugins: [
		    // 装了插件表示当前项目有资格开启HMR
		    new webpack.HotModuleReplacementPlugin()
		  ],

在webpack的配置中, 装插件的方式都一样, 在plugins节点中创建插件对象即可

### html-webpack-plugin插件 ###

目前bundle.js已经托管到内存中了, 但是index.html还是物理磁盘的文件, 而且每次还需要通过contentBase来指定托管的根目录, 程序员还需要操心bundle.js的路径问题

html-webpack-plugin插件主要功能有如下两点:

1. 在内存中会根据指定的模板生成一份index.html直接托管在服务器的根目录中
2. 并且还会自动追加一个bundle.js的引用, 在index.html中

所以程序员不需要再操心bundle.js的引用问题了, 写HTML的时候不需要引入bundle.js同样也可以实现js的效果

使用方法:

1. 装包

		npm i html-webpack-plugin -D

2. 在webpack.config.js中引入

		const HtmlWebpackPlugin = require('html-webpack-plugin')

3. 安装插件

		plugins: [
		    // 装了插件表示当前项目有资格开启HMR
		    new webpack.HotModuleReplacementPlugin(),
		    // 安装插件
		    // 如果不传入任何配置选项, 默认也会创建一个index.html托管在服务器根路径
		    // 只不过这个HTML是空的, title默认是webpack app
		    new HtmlWebpackPlugin({
		      // title: '传智大法好!!!', // 如果模板中有title, 会覆盖这里的配置
		      template: './src/index.html'
		    })
		  ],

注意: 如果需要了解更详细的html-webpack-plugin的使用, 请查阅官方文档, 在github或npm都可以搜索到官方仓库

### loader的使用 ###

在webpack中默认是只能打包js文件的, 如果需要引入css或其他文件, 则会报错

而且为了减少css的二次请求, webpack允许在main.js中直接import css文件, 将css打包到bundle.js中

但是由于webpack默认不能打包css文件, 所以需要安装第三方loader来加载css文件

#### css-loader的使用 ####

1. 安装css-loader和style-loader

		npm i style-loader css-loader -D

2. 在webpack.config.js文件中进行配置

		module: {
		    rules: [
		      {
		        test: /\.css$/,
		        // use: [
		        //   { loader: 'style-loader' },
		        //   {
		        //     loader: 'css-loader',
		        //     options: {
		        //       modules: true
		        //     }
		        //   }
		        // ]
		        // css-loader 用于解析css文件
		        // style-loader 用于将css代码 使用js动态的插入到html中, 减少二次请求
		        // use使用loader时  顺序是固定的从右到左的加载
		        use: ['style-loader', 'css-loader']
		      }
		    ]
		  },

#### less-loader的使用 ####

1. 装包

	需要less-loader和less两个包才可以

		npm i less-loader less -D

2. 配置

		module: {
		    rules: [
		      {
		        test: /\.css$/,
		        // use: [
		        //   { loader: 'style-loader' },
		        //   {
		        //     loader: 'css-loader',
		        //     options: {
		        //       modules: true
		        //     }
		        //   }
		        // ]
		        // css-loader 用于解析css文件
		        // style-loader 用于将css代码 使用js动态的插入到html中, 减少二次请求
		        // use使用loader时  顺序是固定的从右到左的加载
		        use: ['style-loader', 'css-loader']
		      },
		      {
		        test: /\.less$/,
		        use: ['style-loader', 'css-loader', 'less-loader']
		      }
		    ]
		  },

#### sass-loader的使用 ####

sass早期是.sass文件

后来更新了一版, 变成了.scss文件

1. 装包

	注意: node-sass在使用npm时很多时候可能会安装失败, 所以可以选择cnpm或yarn来安装

		npm i node-sass sass-loader -D

2. 配置

		 module: {
		    rules: [
		      {
		        test: /\.css$/,
		        // use: [
		        //   { loader: 'style-loader' },
		        //   {
		        //     loader: 'css-loader',
		        //     options: {
		        //       modules: true
		        //     }
		        //   }
		        // ]
		        // css-loader 用于解析css文件
		        // style-loader 用于将css代码 使用js动态的插入到html中, 减少二次请求
		        // use使用loader时  顺序是固定的从右到左的加载
		        use: ['style-loader', 'css-loader']
		      },
		      {
		        test: /\.less$/,
		        use: ['style-loader', 'css-loader', 'less-loader']
		      },
		      {
		        test: /\.scss$/,
		        use: ['style-loader', 'css-loader', 'sass-loader']
		      }
		    ]
		  },

#### url-loader的使用 ####

webpack也无法解析图片或字体等文件

所以需要使用url-loader来加载

**注意: url-loader是file-loader的升级版, 内部依赖了file-loader, 所以需要安装url-loader和file-loader!**

1. 装包

		npm i url-loader file-loader -D

2. 配置

		 module: {
		    rules: [
		      {
		        test: /\.css$/,
		        // use: [
		        //   { loader: 'style-loader' },
		        //   {
		        //     loader: 'css-loader',
		        //     options: {
		        //       modules: true
		        //     }
		        //   }
		        // ]
		        // css-loader 用于解析css文件
		        // style-loader 用于将css代码 使用js动态的插入到html中, 减少二次请求
		        // use使用loader时  顺序是固定的从右到左的加载
		        use: ['style-loader', 'css-loader']
		      },
		      {
		        test: /\.less$/,
		        use: ['style-loader', 'css-loader', 'less-loader']
		      },
		      {
		        test: /\.scss$/,
		        use: ['style-loader', 'css-loader', 'sass-loader']
		      },
		      {
		        test: /\.(png|jpg|gif|bmp|jpeg)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 81920 // 字节 Byte 如果在8192个字节(8KB)内  就使用base64编码
		            }
		          }
		        ]
		      },
		      {
		        test: /\.(eot|svg|ttf|woff|woff2)$/,
		        use: [
		          {
		            loader: 'url-loader'
		          }
		        ]
		      }
		    ]
		  },