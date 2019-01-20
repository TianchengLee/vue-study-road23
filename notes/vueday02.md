## vue day02 ##

### 指令 ###

#### v-model ####

Vue提供的双向数据绑定的指令, 在Vue中也只有唯一这一个属性可以提供双向数据绑定

	<!-- v-bind只能实现单向绑定 -->
    <!-- <input :aaa="msg" :value="msg" type="text"> -->

    <!-- 为什么v-model不需要手动指定要绑定的属性呢??? -->
    <!-- 由于用户与input交互时, 修改的都是value属性的值, 所以v-model只能绑定value属性 -->
    <!-- v-model 除了可以从M层绑定到V层, 还可以在用户修改value属性时 自动同步回M层 -->
    <input v-model="msg" type="text">


#### v-for ####

在Vue中可以迭代的类型有:

	数组

	对象

	数字

1. 迭代数组

	数组中有多少个元素, 就会循环创建多少个p

	item表示数组中的每一项

		<p v-for="item in list">{{ item }}</p>

	index表示数组中的每一项对应的索引

		<p v-for="(item, index) in list">{{ item }}</p>

2. 迭代对象

	对象中有多少个属性, 就会循环创建多少个p

		<p v-for="(value, key) in obj">{{ key }} --- {{ value }}</p>

3. 迭代数字

	迭代的数字有多大, 就会循环创建多少个p

	**注意: v-for迭代数字时, num从1开始, 到10结束**

		<p v-for="num in 10">{{ num }}</p>

注意事项: v-for中的key属性, 在v-for循环渲染列表后, 如果每个单项中都有状态类型的表单元素, 例如: checkbox, 此时数据顺序发生变化后, 默认不会记录每个单项的状态, 会导致checkbox勾选状态出现混乱

#### v-for的原理 ####

> 当 Vue.js 用 `v-for` 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。

key的作用就是将当前的数据与当前对应的DOM元素进行绑定, 以后如果数据顺序发生变化, Vue会在内部重新排序 然后渲染

如果实在无法理解原理, 那就记住 以后只要用v-for, 都使用 `:key`, 给key绑定一个唯一标识, 可以是 `number/string`

#### v-if和v-show ####

v-if和v-show都是用于控制元素的显示隐藏的

区别在于: v-if有较高的切换性能消耗, v-show有较高的初始渲染消耗

因为, v-if如果表达式是false, 元素压根不会创建, 而v-show如果表达式结果是false, 元素也会创建只是把display设为了none

	<h3 v-if="flag">这是用v-if控制的元素</h3>
    <h3 v-show="flag">这是用v-show控制的元素</h3>

### 样式操作 ###

以前在DOM阶段操作样式的两种方法:

	dom.style.backgroundColor // 行内样式

	dom.className // 设置类样式名, 结合css选择器完成

在Vue中同样也是两种方法操作样式:

#### 在Vue中动态绑定类样式 ####

不用属性绑定, 设置固定的类样式

	<p class="red active"></p>

如果需要动态修改类样式, 则需要使用属性绑定

属性绑定类样式可以为数组或对象

1. 绑定数组

	现在虽然是使用属性绑定了, 但是依然是写死了, 没有实现的动态的切换

		<p :class="['red', 'active']"></p>

	动态切换有两种方式, 可以使用三元表达式来决定是否要动态添加数组元素

		<p :class="['red', flag ? 'active' : '']"></p>

	推荐以下方法:

		<p :class="['red', { active: flag }]"></p>

2. 绑定对象

	当flag1为true时应用red类样式, 否则不应用

	当flag2位true时应用active类样式, 否则不应用

		<p :class="{ red: flag1, active: flag2 }"></p>

**总结: 当类样式较多, 而需要动态切换的类名只有一个时, 推荐使用绑定数组的方式来实现动态切换, 反之, 当类样式较少, 而都需要动态切换类名时, 使用对象较为方便**

#### 操作行内样式 ####

给 `style` 属性进行 v-bind 绑定

	<p :style="{ 'background-color': 'pink', color: 'black' }"></p>

通过绑定数组, 可以同时绑定多个样式对象

	<p :style="[ 样式对象1, 样式对象2 ]"></p>

### 过滤器 ###

过滤器的基本使用方法:

1. 先定义好全局过滤器

		// 定义全局过滤器
	    // 参数1: 过滤器名称
	    // 参数2: 回调函数
	    //   回调函数中第一个参数是管道符左边的数据, 第二个参数起都是过滤器调用时传入的参数
	    Vue.filter('msgFilter', function(data, str) {
	      return data.replace('Helloworld', str)
	    })

2. 在插值表达式或v-bind中使用, v-text等其他指令中无法使用

	    <p>{{ msg | msgFilter('你好世界') }}</p>
	
	    <input type="text" :value="msg | msgFilter('你好世界')">

注意: 过滤器可以串联使用, 例如

	<p>{{ msg | msgFilter('你好世界') | test }}</p>

