## vue day01 ##

### vue 简介 ###

1. 简单易用, 上手快
2. 热度最高

#### 对比jQuery的区别 ####

- 以前使用jQuery结合模板引擎(art-template), 每一次进行页面渲染都需要将整个节点渲染, 而如果使用vue进行渲染, 只会将改变的内容渲染一次, 大大提高了用户体验!!!

- jQuery只是一个JavaScript库, 对项目的侵入性较小, 开发过程中可以很轻易的切换成其他库或框架来继续开发

- jQuery一直以来最强大的功能就是选择器和便捷的DOM操作, 处理了浏览器兼容性问题

- Vue等MVVM思想设计的框架, 都有数据绑定的特点, 当Model层的数据更新, 会通过VM层自动同步刷新到View层, 从此程序员只需要关注业务逻辑, 而不需要操作DOM

- Vue和Angular都提供了双向数据绑定, 除了可以从Model同步到View层, 还可以在View层数据发生变化时反向同步到Model层

### Vue的基本使用 ###

1. 引入vue.js文件

		<script src="./lib/vue.js"></script>

2. 引入vue.js后, 全局作用域中就有一个 `Vue` 的构造函数, 通过此构造函数创建`Vue`实例

	新创建出来的实例对象, 就是MVVM中的VM层

		let vm = new Vue()

3. 在VM实例创建时, 可以传入一个配置对象

	html结构:

		...
		<body>
			<div id="app"></div>
		</body>
		...

	js代码:

		let vm = new Vue({
			el: '#app', // vm实例托管的区域
			data: {
				test: 'Hello Frontend 23!!!'
			}
		})

4. 当创建了VM实例后, 在VM实例托管的范围内, 就可以使用模板语法引用data中的数据(只要data中的数据修改了, 页面会自动同步)

	html结构:

		<div id="app">
			{{ test }}
		</div>

### VSCode编写Vue的插件 ###

1. Vetur
2. Vue 2 Snippets

### Vue的指令 ###

> 在Vue中, 只要是以 `v-` 开头的属性, 都是指令

#### v-cloak ####

为了解决Vue模板渲染时的闪烁问题

闪烁:

> 当标签内使用小胡子`{{}}`语法进行模板渲染时, 由于Vue文件在HTML结构之后才引入, 会导致`{{}}`模板代码在HTML中短暂停留, 然后再渲染成真正的数据, 用户体验不够好

使用`v-cloak`指令结合CSS将元素默认隐藏起来, 当数据变化时进行渲染, 会自动显示, 无需手动干预

其他解决方案: 不要在HTML后面引入vue文件, 应该在head区域引入

#### 插值表达式 ####

同`art-template`, 将data中的数据渲染到`{{}}`中, `{{}}` 内部写的是表达式(可以写js代码的地方)

	{{ test }}

**注意: 在Vue中插值表达式只能用于元素内部文本的渲染, 不能用于属性渲染**

#### v-text ####

将表达式的结果渲染到标签的 `innerText` 属性上

后面的内容会拼接到test数据后面

	<p>{{ test }}后面的内容</p>

后面的内容会被**覆盖**, 等同于 `p.innerText = test`

	<p v-text="test">后面的内容</p>

#### v-html ####

用法同`v-text`, 区别在于 `v-html` 可以解析带HTML标签的结构, `v-text` 会将HTML解析成纯文本进行渲染

	<p v-html="test"></p>

#### v-bind ####

Vue中提供用于属性绑定的指令

	<input v-bind:value="val + 'aaa'" type="text">

由于v-bind太长了, 所以Vue提供了简写 `:`

v-bind支持非标准属性的绑定

	<input :aaa="val" :value="val + 'aaa'" type="text">

### v-on ###

Vue中提供用于事件绑定的指令

	<input id="inp" :value="msg" v-on:keyup="keydownHandler" type="text">

data与methods的代码:

	data: {
		msg: '你好啊!'
	},
	methods: {
		keydownHandler() {
		  // console.log('我被调用了!')
		  // console.log(document.querySelector('#inp').value)
		  this.msg = document.querySelector('#inp').value
		}
	}

**注意: 由于还没有学习到双向数据绑定的指令, 所以暂时操作了一下DOM, 后期实现该功能不需要操作DOM**

v-on的简写: `@`

	<input id="inp" :value="msg" @keyup="keydownHandler" type="text">

### 事件修饰符 ###

Vue中为了方便开发人员处理一些简单的逻辑, 例如阻止冒泡或者阻止浏览器默认行为等操作

特意提供了一系列事件修饰符完成:

1. `.stop`
2. `.prevent`
3. `.capture`
4. `.self`
5. `.once`
6. `.passive`

		<!-- 阻止单击事件继续传播 -->
		<a v-on:click.stop="doThis"></a>
		
		<!-- 提交事件不再重载页面 -->
		<form v-on:submit.prevent="onSubmit"></form>
		
		<!-- 修饰符可以串联 -->
		<a v-on:click.stop.prevent="doThat"></a>
		
		<!-- 只有修饰符 -->
		<form v-on:submit.prevent></form>
		
		<!-- 添加事件监听器时使用事件捕获模式 -->
		<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
		<div v-on:click.capture="doThis">...</div>
		
		<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
		<!-- 即事件不是从内部元素触发的 -->
		<div v-on:click.self="doThat">...</div>

### github提交代码时报错解决方案 ###

报错信息:

> permisstion denied

> access denied

1. 检查公钥是否配置正确

2. 检查当前仓库关联的远端仓库是否使用的 `ssh` 协议

	查看当前仓库的关联详细信息

		git remote --verbose

	将本地的仓库关联到远端的 git@github.com:TianchengLee/test.git

		git remote add origin git@github.com:TianchengLee/test.git

	如果之前关联的是https, 非ssh, 可以删除
		
	删除关联

		git remote remove origin

	重新添加

		git remote add origin git@github.com:TianchengLee/test.git



