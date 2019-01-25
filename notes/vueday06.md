## vue day06 ##

### 路由传参 ###

### watch ###

监视数据变化

使用方法:

在于data/methods同级的地方, 添加一个watch属性, 值为对象

在对象中添加方法, 方法名就是要监视的数据(该数据必须存在, 可以是data中的数据, 也可是是vm实例上的数据例如:$route)

	watch: {
		$route(to, from) {
	      // console.log(to, from)
	      // console.log(to.path)
	      // console.log(from.path)
	      // console.log(newVal + ' --- ' + oldVal)
	      // 客户端版本信息  BOM
	      // console.log(window.navigator.userAgent)
	      if (to.path === '/login') {
	        console.log('欢迎进入登录页面')
	      } else if (to.path === '/register') {
	        console.log('欢迎进入注册页面')
	      }
	    }
	}

### computed ###

注意事项:

1. 计算属性，在引用的时候，一定不要加 () 去调用，直接把它 当作 普通 属性去使用就好了；

2. 只要 计算属性，这个 function 内部，所用到的 任何 data 中的数据发送了变化，就会 立即重新计算 这个 计算属性的值

3. 计算属性的求值结果，会被缓存起来，方便下次直接使用； 如果 计算属性方法中，所以来的任何数据，都没有发生过变化，则，不会重新对 计算属性求值；

4. 一旦在data中定义了属性, 就不能在computed中定义同名属性了 会冲突

5. computed计算属性默认是只读的

使用方法:

在data或methods同级的地方加入一个computed属性

	computed: { // 在 computed 中，可以定义一些 属性，这些属性，叫做 【计算属性】， 计算属性的，本质，就是 一个方法，只不过，我们在使用 这些计算属性的时候，是把 它们的 名称，直接当作 属性来使用的；并不会把 计算属性，当作方法去调用；
        'fullname': function () {
          console.log('ok')
          return this.firstname + '-' + this.middlename + '-' + this.lastname
        }
      }


