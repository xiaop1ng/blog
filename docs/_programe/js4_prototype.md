---
date: 2018-01-20 14:06
author: xiaop1ng
location: ShenZhen
title: JavaScript —— 原型 prototype（四）
tags:
  - js
---

# JavaScript —— 原型 prototype（四）

## 定义

 在 JS 里  `prototype`  是一个被称作对象的原型属性，这个属性任然是一个对象，它可以作为所有新副本的基引用 (base reference) 。我们可以给这个原型对象添加属性，这些属性成为了由它实例化出来的所有对象的公有属性。

 我们可以对比其他强类型语言如 Java 中类定义的非静态属性和函数（public），是属于所有该类的所有对象，也就像这里的 base reference。所以在 Java 中描述静态成员与非静态成员时有：

 
> 静态成员整个类中只有一份，而非静态的成员每个对象都有一份
> 
>  
 
## 例子

 
```
// classA 的构造器
function classA(numberA) {
    this.numberA = numberA;
}

classA.staticVal = "static value";

// 一个 classA 的实例
var objRefA = new classA(2);

// 给 classA 的原型对象添加一些属性
classA.prototype.getNumberA = function() {
    return this.numberA;
};

classA.prototype.typeName = "type name is classA";

console.log( objRefA.getNumberA() ); // 2
console.log( objRefA.typeName ); // type name is classA 
console.log( objRefA.staticVal ); // undefined
console.log( objRefA.constructor.staticVal ); // static value
```
 比较有趣的是弱语言没有强语言那么严谨，但是他非常灵活。这里的对象在实例化之后通过原型对象 prototype 给他增添了一个 getNumberA 的函数和一个 typeName 的属性。同样对象是无法直接访问到 classA 的成员的，但是我们可以通过 constructor 属性作为我们访问 classA 中的成员的一座桥梁。

 
> 思考：前面有提到 Java 中对象可以直接访问类中的 public 的成员，private 的成员无法直接访问。那么我们弱语言中可以实现这种 private 的成员呢？
> 
>  
 
## 通过 prototype 继承

 说到继承，还是先聊一聊强类型语言 Java 中的实现，在 Java 中子类中使用 extends 关键字即可实现。子类中可以访问基类对子类开放的成员 (  `public` 、 `protected`  ) 

 
```
// 基类
function baseClass() {
    this.key = "base";
}
// 子类
function classB (name) {
    this.name = name;
}

// 通过将基类的对象赋值给子类的原型对象，使得子类拥有基类的全部可见成员
classB.prototype = new baseClass();

var objRefB = new classB("b");

console.log(objRefB.key); // base
```
