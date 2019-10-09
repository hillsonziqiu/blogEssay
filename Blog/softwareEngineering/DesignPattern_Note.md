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

### 单例模式

### 原型模式

### 装饰器模式
