## vue day04 ##

### 动画 ###

在Vue中使用动画, 一般是用于帮助用户理解应用程序而存在, 并非为了做出炫酷的特效

核心目标在于掌握基本动画的实现即可

在Vue中实现动画, 需要经历6个类名(只需要掌握四个), 如图所示:

![动画过渡类名图解](https://cn.vuejs.org/images/transition.png)

根据动画图示, 将四个类名分为两组:

动画执行之前和结束后元素的状态:

	v-enter
	v-leave-to

执行过渡动画的样式:

	v-enter-active
	v-leave-active

1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

4. v-leave-to: 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。


案例:

1. 先将要执行动画的元素使用 `<transition></transition>` 标签包裹

		<input type="button" value="toggle" @click="flag=!flag">
	    <!-- 需求： 点击按钮，让 h3 显示，再点击，让 h3 隐藏 -->
	    <transition>
	      <h3 v-show="flag">这是一个H3</h3>
	    </transition>

2. 给四个过渡类名加样式, 完成动画

		.v-enter,
		.v-leave-to {
			opacity: 0;
			transform: translateY(200px);
		}
		
		.v-enter-active,
		.v-leave-active {
			transition: all .8s ease-in-out;
		}

点击按钮即可进行动画过渡切换显示隐藏了!

整个过程不需要操作DOM元素, 只靠标签+CSS类样式即可完成, 非常方便!

如果项目中有多个地方需要使用动画, 而默认情况下, 动画的类名都是 `v-` 开头, 所以需要自定义前缀

通过给`transition`标签添加`name`属性, 可以自定义`v-`的前缀

	<transition name="my">
      <h6 v-if="flag2">这是一个H6</h6>
    </transition>

style样式:

	.my-enter,
    .my-leave-to {
      opacity: 0;
      transform: translateY(70px);
    }

    .my-enter-active,
    .my-leave-active{
      transition: all 0.8s ease;
    }

### 列表动画 ###

不同于单元素动画, 需要使用`transition-group`标签进行包裹

1. 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` 特性更换为其他元素。

2. 过渡模式不可用，因为我们不再相互切换特有的元素。

3. 内部元素 总是需要 提供唯一的 `key` 属性值。

4. 通过`appear`属性可以让列表加载时执行动画


案例:

	<transition-group appear tag="ul">
      <li v-for="(item, i) in list" :key="item.id" @click="del(i)">
        {{item.id}} --- {{item.name}}
      </li>
    </transition-group>

style:

	.v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translateY(80px);
    }

    .v-enter-active,
    .v-leave-active,
    .v-move {
      transition: all 6s ease;
    }

    .v-leave-active {
      position: absolute;
    }

如果想让删除时的动画更加平滑, 删除一个元素后, 其他元素一起执行动画, 可以使用Vue内部封装FLIP动画队列后的 `v-move` 类样式来设置过渡效果

**注意: 当执行删除动画时, 元素依然占位置, 所有需要在v-leave-active中设置绝对定位, 让元素脱离文档流实现完美的动画效果!!!**

### 组件化开发 ###

组件化: 对视图层的逻辑划分, 提高了视图层的复用性

模块化: 对Controller的划分, 提高了业务代码的复用性


### 组件的创建 ###

注意事项:

- 组件必须要注册完成后, 才可以使用!

- 组件名如果注册时用了驼峰命名, 使用时需要改成`-`连接

- 组件的模板`template`中有且只能有一个根节点

创建组件的方法:

1. Vue.extend方法(不推荐, 太麻烦了)

		// 创建组件, 第一种方式 (不推荐使用)
	    // let com = Vue.extend({
	    //   template: '<h1>com组件的模板代码</h1>'
	    // })
	
	    // 注册组件  不论通过哪一种方式创建出来的组件, 注册都是如此
	    // 参数1: 组件名, 如果注册时用了驼峰命名, 使用时需要改成-连接
	    // 参数2: 组件对象
	    // Vue.component('com', com)
	    // Vue.component('com', Vue.extend({
	    //   template: '<h1>com组件的模板代码</h1>'
	    // }))

2. 直接使用带有`template`属性的对象

	    // 创建组件的第二种方式  直接使用对象即可
	    Vue.component('com', {
	      template: '<h1>com组件的模板代码</h1>'
	    })


3. 在app区域外定义好模板后, 直接通过template属性引用

		  <template id="tmp">
		    <div>
		      <p>你是一个p</p>
		      <h1>你是一个h1</h1>
		    </div>
		  </template>

		// 创建组件的第三种方式  同样是对象, 但是template属性指向一个模板ID即可
	    // 需要在app区域外定义好模板, 这种做法有智能提示, 非常方便!
	    Vue.component('com', {
	      template: '#tmp'
	    })

