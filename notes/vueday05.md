## vue day05 ##

### 组件的data ###

组件内部的成员, 基本上和vm实例类似, 有data/methods/filters/directives/八个生命周期函数等 都是一样的

但是组件中的data和vm实例中的data是有区别的

组件中的data必须是一个 函数 , 并且内部必须返回一个对象

原因:

> 为了避免多个组件实例内部共享同一个对象

### 组件切换动画 ###

和单元素动画一样, 不过由于是组件的切换, 所以还有一个mode属性, 用于设置切换时的模式, 例如先出后进或是先进后出

	<transition mode="out-in">
      <component :is="comName"></component>
    </transition>

### 父组件向子组件传值 ###

核心原理: 属性绑定 v-bind 指令

1. 在父组件中定义好数据后, 在子组件身上绑定数据(v-bind)

		<login :pmsg="msg" v-if="flag"></login>

2. 在子组件中通过 `props` 定义一下`pmsg`

		Vue.component('login', {
	      props: ['pmsg'],
	      template: '<h3>登录组件----{{ pmsg }}</h3>'
	    })

**注意: props中定义的数据是单向下行绑定的**

特点就是为了避免, 子组件中修改数据导致父组件或其他子组件数据同时篡改, 所以Vue设计的时候就考虑的**单向下行**的特点, 仅允许父组件修改数据, 修改数据后会同步到所有引用了该数据的子组件中, 而不允许子组件反向同步(子组件中修改props的数据其他组件都不会受到影响)

### 子组件向父组件传值 ###

核心原理: 自定义事件 v-on 指令绑定, 将函数传递给子组件, 子组件找个合适的时机触发事件并携带数据

1. 先给子组件绑定事件, `gotIt` 函数需要在父组件的 `methods` 中定义好

		// foo = gotIt
		<login @foo="gotIt" :pmsg="msg" v-if="flag"></login>

2. 在子组件内部, 某个时机调用`$emit()`方法触发父组件绑定的foo事件

	$emit()方法有多个参数

	参数1: 要触发的事件名

	参数2及以后: 事件处理函数的参数

		this.$emit('foo', this.username)

### ref(了解内容) ###

ref : reference 引用

Reference Error 引用错误

Vue在设计之初也考虑到了, 很难完全避免DOM操作, 只有在一些基础的业务处理上可以省去DOM操作, 但是在一些特定场景下还是需要用到DOM操作, 所以保留了一个`ref`的设计, 来获取DOM元素

可以通过给元素添加 `ref` 属性, 将来就可以在vm或组件实例身上通过 `$refs` 属性获取到所有添加了`ref`属性的DOM对象

### 前端路由 ###

SPA (Single Page Application)单页面应用程序的核心就是源于`#` 锚点的切换, 实现的组件切换

### 路由的基本使用 ###

1. 引入路由的包

		<!-- 1. 安装 vue-router 路由模块 -->
	  	<script src="./lib/vue-router-3.0.1.js"></script>

2. 创建路由对象

		// 组件的模板对象
	    var login = {
	      template: '<h1>登录组件</h1>'
	    }
	
	    var register = {
	      template: '<h1>注册组件</h1>'
	    }
	
	    // 注册组件  Vue.component这种方式
	    // 目的是为了在模板中使用 <> 方式使用组件
	    // Vue.component('login', login)
	
	    // 2. 创建路由对象
	    let router = new VueRouter({
	      routes: [
	        // { path: '/', component: login },// 虽然可以让首页显示login组件, 但是不推荐
	        { path: '/', redirect: '/login' }, // 路由重定向, 当用户访问 / 路径时 自动跳转到 /login 路径
	        { path: '/login', component: login }, // 一个路由匹配规则
	        { path: '/register', component: register },
	      ],
	      // linkActiveClass: 'mui-active'
	    })

3. 将路由对象挂载到VM实例的配置对象中

	    // 创建 Vue 实例，得到 ViewModel
	    var vm = new Vue({
	      el: '#app',
	      data: {},
	      methods: {},
	      router // 3. 将创建的路由对象挂载到vm实例中
	    });

4. 在app区域内放置一个`router-view`组件占位

		<router-view></router-view>

5. 通过地址切换即可显示不同路由, 也可以使用`ruoter-link` 组件来渲染`a`标签

	tag属性用于指定渲染的标签, 默认渲染a标签
	to属性用于指定跳转的路由, 不需要加`#`

		<router-link tag="span" to="/login">登录</router-link>
    	<router-link to="/register">注册</router-link>

6. 使用`router-link`后会自动给当前的路由对应的a标签加上一个默认的类名: `router-link-active` 用于做当前路由高亮

7. 通过给`router-view`包裹`transition`组件来实现组件的切换动画, 同单元素动画的做法