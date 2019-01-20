## vue day03 ##

### 私有过滤器 ###

不同于全局过滤器, 私有过滤器只能在当前vm实例内部使用, 定义方式也是在当前vm实例的配置对象中加入一个filters的节点, 与methods和data等节点同级:

	filters: {
        // 方法名就是过滤器名 
        // 方法就是过滤器
        // 就近原则 如果当前vm实例的私有过滤器和全局过滤器同名了 就会优先使用私有过滤器
        msgFormat() {
          
        }
      }

### 按键修饰符 ###

当用户输入完数据后, 每次都需要点击添加按钮才可以将数据录入表中, 用户体验不佳, 最好能够当用户输入完数据后, 直接按回车立即录入表中

Vue提供了按键修饰符来解决这个问题:

	<input @keyup.enter="add" type="text" class="form-control" v-model="name">

`@keyup.enter` 的意思是给input绑定键盘抬起事件, 并且只有在`回车键`抬起时才会触发

也就是当用户抬起回车时就会调用add方法 进行添加的逻辑操作

所有**键盘事件**都有按键修饰符, 本质上其实是点的keyCode, 只不过Vue为了方便大家记忆, 内置了一些别名:

	.enter
	.tab
	.delete (捕获“删除”和“退格”键)
	.esc
	.space
	.up
	.down
	.left
	.right

如果需要自定义别名, 可以使用全局的`config.keyCodes`对象来添加:

	// 可以使用 `v-on:keyup.f1`
	Vue.config.keyCodes.f1 = 112

### 自定义指令 (了解内容) ###

在Vue内部提供了很多内置指令: v-text, v-html, v-if, v-show, v-model ... 等等, 一切以v-开头的都是指令

除了内部提供的这些指令外, 开发者还可以自定义指令

因为Vue的作者考虑到, 有些情况还是需要操作DOM元素的, 通过指令可以对一些DOM元素操作进行封装

1. 定义全局指令

		// 定义全局指令
	    // 参数1: 指令名称, 不需要 v-
	    // 参数2: 对象, 对象中有可以有5个函数 bind, inserted, update, componentUpdated, unbind
	    //     5个函数就是所谓的钩子函数, 就是当指令应用到标签身上整个过程, 每个阶段所调用的函数
	    Vue.directive('focus', {
	      // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	      bind(el) {
	        // console.log(el)
	        // console.log('我被绑定了')
	        // el.focus()
	      },
	      // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
	      inserted(el) {
	        console.log(el)
	        // console.log('我insert到父节点了')
	        el.focus()
	      },
	      // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
	      update() {}
	    })

2. 使用指令

		<input v-focus type="text" class="form-control" v-model="keywords">

**注意: 定义指令时不需要加 `v-` 使用指令时必须要加 `v-`**


### 定义私有指令 ###

同私有过滤器, 在vm配置对象中, 和methods以及data同级的位置, 加入一个`directives`的属性:

	
	directives: {
		focus: {
		  bind() {
		
		  },
		  inserted() {
		    
		  }
		}
	}

### 生命周期函数 ###

生命周期函数是指, Vue实例创建的过程中, 从出生到死亡每个阶段所执行的函数

一共有8个:

	beforeCreate: 实例完全创建之前, 此时data和methods等数据都没有初始化, 不能使用

	created: 实例已经创建完毕了, 此时data和methods等数据都可以使用了, 实例对象也可以访问

	beforeMount: 模板在内存中编译完成了, 但是还未渲染到页面上

	mounted: 编译好的模板完全渲染到页面, 用户最终看到的样子, 此时DOM元素也是最新的, 如果想操作DOM元素, 最好在这个生命周期函数中进行

	beforeUpdate: 当data中数据改变时会触发, 此时页面上的数据并没有重新渲染, 只是data中的数据更新了

	updated: 当data中数据改变后, 并将页面上的数据也更新完成后会触发, 此时data中的数据和页面上的数据是同步的

	beforeDestroy: 当实例进入销毁阶段时执行的钩子函数, 此时Vue实例中的data/methods/filters/directives等都还可以使用

	destroyed: 实例上的所有成员已经完全销毁, 无法使用了


### 域名更新 ###

课程中所有接口的域名都替换为: `vue.lovegf.cn:8899`

