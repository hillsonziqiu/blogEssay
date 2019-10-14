# 设计模式笔记

万物皆对象，我感觉看了设计模式以后才正确的明白了对象在代码中的重要意义，也给了我更多的灵感，还顺便帮助我理解了很多原码里宏观上的意义。之前觉得框架都定义好的东西，我只要会用就 ok 了，但是他为什么可以用，为什么能这样用，为什么不可以这么用。我之前几乎是不会去想的，就知道要这么用才对，这么写才不会报错，这么写才能编译下去。这样真心不好，就像学习吉他一样，都是三年前学的，别人是弹三年的水平，我是入门三年的水平。这篇文章是我读掘金小册学习的设计模式的一些基础理解，无意推广分享，纯粹做个个人笔记。有兴趣的朋友完全可以拿走随便用，没兴趣的同学看看也无妨，有错误请指出，谢谢~

### 工厂模式（简单工厂）

自己说： 工厂模式就是通过 new 的方法生成固定属性的对象

```
// 创建了一个可以重复使用的User工厂（类）
class User {
  constructor(name: string, age: number, career: string, lang: string) {
    this.name = name
    this.age = age
    this.career = career
    this.lang = lang
  }
  private name: string
  private age: number
  private career: string
  private lang: string

  private speak() {
    console.log(`I can speak ${this.lang}`)
  }
}

// 使用方法
const ziqiu = new User('ziqiu', 27, 'Senior Front-End Engineer', 'Chinese')
const Amy = new User('Amy', 21, 'Doctor', 'English')

console.log（ziqiu） 这就是我了
ziqiu.speak() // I can speak Chinese  我还能说话

Amy 就跟 ziqiu 有相同的属性，但是不同的人
ziqiu 和 Amy 都是对象（拥有相同属性，不同属性值的对象）

```

### 工厂模式（抽象工厂）

刚看到这个词的时候我就在想啊，工厂不就是抽象出来方便使用的一个东西吗？为啥又来了一个抽象工厂的概念，看完文章后，恍然大悟，原来这 TMD 就是抽象工厂啊~
之前好奇后端同学写的 JAVA 代码，无意中看到他们经常使用的一个叫 @override 的注解。 顾名思义，override 就是覆盖的意思，他的意思就是会覆盖父类里相同的方法。我就问了我的小后端小 G 同学，为啥这个类需要再写一次覆盖它呀。当时模模糊糊听说是无法直接拿来使用的一个方法，需要重写以后才能执行。但是当时并不知道为什么要这么做。哎，好后悔大学的时候浪费了 4 年青春，没好好看看设计模式，编程思想，数据结构，算法等知识。言归正传，那为啥要覆盖才能使用呢？直接时候为啥会报错呢？这种需要复写的方法的工厂，其实就是用了抽象工厂模式。

话不多说，直接上代码

```key
// 首先创建一个工厂 是一个人
// 其中有个方法属性是用来做自我介绍的, 介绍的内容大概是自己的工作情况，家庭情况, 因为这个每个人都不一样，说话的方法也不一样，表达的顺序也不一样，那么这就没法定了，一个人一个说法，这咋整，需求就是每个人都要有这么一个方法的，没有这个方法就要报错，这可咋办~总不能杀一个产品经理祭天，这个需求不做了吧，那么用一次这个方法就挽救了一个产品经理   :)

class Person {
  constructor(name: string, sex: string, age: number) {
    this.name = name
    this.sex = sex
    this.age = age
  }

  private name: string
  private sex: string
  private age: number

  public intro() {
    throw new Error('你必须得说点啥，不说要砍人的呀~快准备一下')
  }
}

```

好啦我们现在就创建了一个基本类了简单使用一下

```key
const Ziqiu = new Person('子丘', '男', 27)

console.log(Ziqiu)  // 就有了这个一个叫子丘的男生27岁了

// 那么我看这个人里有个intro方法，我用一下吧, 看看你说点啥
Ziqiu.intro() // 糟糕，这个人死机了……怎么还抛出了个异常呀  '你必须得说点啥，不说要砍人的呀~快准备一下'

```

我并没有准备好要说什么那怎么办? 那就赶紧准备一下吧。

```
class ZiqiuPerson extend Person {
  public intro() {
    console.log('我叫子丘')
    console.log('一看就知道，我是个男孩子')
    console.log('年纪有点大，能力貌似有点差，但是我有决心能够成为最强能力者~')
    console.log('谢谢~')
  }
}

const Ziqiu = new ZiqiuPerson('子丘', '男', 27)

// 再来一下自我介绍吧

Ziqiu.intro()

// 我叫子丘
// 一看就知道，我是个男孩子
// 年纪有点大，能力貌似有点差，但是我有决心能够成为最强能力者~
// 谢谢~

```

哇，这就 ok 了。

可能介绍的没有小书上的详细，但是大概意思就是这样。我之前好奇的怎么让没有重写的方法报错。突然之间很明了了。原来不重写这个方法的话我默认就直接给你抛出个错误不就结了嘛~哈哈，果真我脑子有点跟不上趟~希望看完几本小书能够让我拥有一定的真正的软件工程师的能力。

copy 一下小书作者的总结

---

它们的共同点，在于都尝试去分离一个系统中变与不变的部分。它们的不同在于场景的复杂度。在简单工厂的使用场景里，处理的对象是类，并且是一些非常好对付的类——它们的共性容易抽离，同时因为逻辑本身比较简单，故而不苛求代码可扩展性。抽象工厂本质上处理的其实也是类，但是是一帮非常棘手、繁杂的类，这些类中不仅能划分出门派，还能划分出等级，同时存在着千变万化的扩展可能性——这使得我们必须对共性作更特别的处理、使用抽象类去降低扩展的成本，同时需要对类的性质作划分，于是有了这样的四个关键角色：

1. **==抽象工厂==**（抽象类，它不能被用于生成具体实例）： 用于声明最终目标产品的共性。在一个系统里，抽象工厂可以有多个（大家可以想象我们的手机厂后来被一个更大的厂收购了，这个厂里除了手机抽象类，还有平板、游戏机抽象类等等），每一个抽象工厂对应的这一类的产品，被称为“产品族”。
2. **==具体工厂==**（用于生成产品族里的一个具体的产品）： 继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
3. **==抽象产品==**（抽象类，它不能被用于生成具体实例）： 上面我们看到，具体工厂里实现的接口，会依赖一些类，这些类对应到各种各样的具体的细粒度产品（比如操作系统、硬件等），这些具体产品类的共性各自抽离，便对应到了各自的抽象产品类。
4. **==具体产品==**（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）： 比如我们上文中具体的一种操作系统、或具体的一种硬件等。

抽象工厂模式的定义，是围绕一个超级工厂创建其他工厂。

### 单例模式

总是用顾名思义这个词，但是这里真的总结的太妙了，还是得说顾名思义，单例意思就是一个源，一个例子，一个实例，反正不管你长成啥样，你反正就是你自己。这个有点像我在开发的时候，喜欢通过修改传进来的形参来达到修改传过来的源变量的目的. 可能在标准代码中不被允许，可能变量的变化会让你产生某些疑问，我想说，只要思路清晰，逻辑正确，自己的代码你想怎么写就怎么写。不过在团队合作中还是要遵循规范，不能一昧的特立独行。扯远了，回到单例上来。举出几个单例模式的例子吧： vuex， redux。 比如 vuex 可以在项目的任何地方，采用 import 的方式引入，也能获取到同一个 store 实例的数据。就是因为单例模式。单例在你身边，但是你可能很容易忽略。

话不多说，直接上代码：

```key
// 单例初体验
class ZiqiuPerson {
  constructor() {
    this.money = 0
  }

  static create() {
    if (!ZiqiuPerson.instance) {
      ZiqiuPerson.instance = new ZiqiuPerson()
    }
    return ZiqiuPerson.instance
  }

  money = 0

  ask(arg) {
    if (arg.includes('子丘好帅~')) {
      console.log('谢谢夸奖')
    } else {
      console.log('我不知道你在讲什么，请说: 子丘好帅, 谢谢~')
    }
  }

  give(money) {
    this.money += money
  }
}

const insZiqiuA = ZiqiuPerson.create()
const insZiqiuB = ZiqiuPerson.create()

console.log(insZiqiuA === insZiqiuB) // true

insZiqiuA.ask('子丘好帅') // '谢谢夸奖'
insZiqiuA.ask('子丘好丑') // '我不知道你在讲什么，请说: 子丘好帅, 谢谢~'

insZiqiuA.give(300000)
console.log(insZiqiuA.money) // 300000  哇发达了，一下子这么多钱
console.log(insZiqiuB.money) // 300000  哇还是我，也是有这么多的钱，所以不管有多少个定义，我还是我
```

因为这是个我的单例，那么我可以把我的 money 属性也加在上面。那么我卖东西，不管是谁付给我钱，那么我拥有 money 总数都会增加。而且两个实例都是同一个存款

```
// 采用闭包方法再来实现一遍create  的逻辑

ZiqiuPerson.create = (function() {
  let instance = null
  return function() {
    if (!instance) {
      instance = new ZiqiuPerson()
    }
    return instance
  }
})()

```

copy 文章中 vuex 的代码留作纪念

```
// 安装vuex插件
Vue.use(Vuex)

// 将store注入到Vue实例中
new Vue({
    el: '#app',
    store
})

// 通过调用Vue.use()方法，我们安装了 Vuex 插件。Vuex 插件是一个对象，它在内部实现了一个 install 方法，这个方法会在插件安装时被调用，从而把 Store 注入到Vue实例里去。也就是说每 install 一次，都会尝试给 Vue 实例注入一个 Store。

let Vue // 这个Vue的作用和楼上的instance作用一样
...

export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}
```

啊~~~竟然写到了第二天。。。以后不能这样了，以后工作日的话每天早上写一篇好了……啧啧啧……话说我的工作还没完成，希望明天能搞定~加油！

第二天来补充了, 补充一个 store 本地存储实例

```
class Store {

  static create() {
    if (!Store.instance) {
      return new Store()
    }
    return Store.instance
  }

  getItem(key) {
    return window.localStorage.getItem(key)
  }

  setItem(key, val) {
    return window.localStorage.setItem(key, val)
  }
}

const StoreA = Store.create()
const StoreB = Store.create()

StoreA.setItem('name', 'Ziqiu')
StoreB.getItem('name')  // 'Ziqiu'

console.log(StoreA === StoreB) // true
```

小册的单例模型举例： 全局弹框（弹弹弹，弹出全局框）

### 原型模式

引入小书讲的一段话开始原型模式

> 在原型模式下，当我们想要创建一个对象时，会先找到一个对象作为原型，然后通过克隆原型的方式来创建出一个与原型一样（共享一套数据/方法）的对象。

其实我的理解就是在构造函数的基础上，构造函数用于初始化这个对象的基本信息，通过原型链这种方法，对其进行个性化延伸。

```
class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  speak() {
    console.log('你让我说我就说了？')
  }
}

// 等同于
function User(name, age) {
  this.name = name
  this.age = age
}

User.prototype.speak = () => {
  console.log('你让我说我就说了？')
}
```

对于这句话

> 在 JavaScript 中，我们使用原型模式，并不是为了得到一个副本，而是为了得到与构造函数（类）相对应的类型的实例、实现数据/方法的共享。克隆是实现这个目的的方法，但克隆本身并不是我们的目的。

我觉得就是每次 new 一个新的对象出来以后他其实都是一个不同的对象，每次实例化都是不同的对象。但是他的样子长得又很像，那么只能采用 clone 的方法，搞出来两个看似相同的对象。那么克隆方法已经写到了 Utils/DeepClone 中。

### 装饰器模式

好像有点好玩，但又有点不容易理解，明天再理解一番再笔记
