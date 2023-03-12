---
date: 2018-01-15 22:02
author: xiaop1ng
location: ShenZhen
title: JavaScript —— 方法的重载（一）
tags:
  - js
---


 
## 方法的重载（Function overloading）

 先看百度百科中对于方法重载的定义 

 
> 方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。调用重载方法时，编译器能通过检查调用的方法的参数类型和个数选择一个恰当的方法。
> 
>  
 我们总结一下就是根据不同的参数情况来选择执行不同的程序。   
 依赖两件事情：方法中 **参数数量** 和 **参数类型**

 
## 1.参数数量：

 方法参数伪数组(pseudo-array) -> **arguments** 这个数组具有.length 属性来获取参数列表的长度 **arguments.length**

 
### 实验一 —— 使用这个方法的参数伪数组写一个任意个参数求和

 
```js
// 接受多个参数求和的方法
var addAll = function() {
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

var result1 = addAll(1,2,3,6);
var result2 = addAll(6,4,5,9,1,9,8,58);
console.log("result1: " + result1);
console.log("result2: " + result2);
// 输出
// result1: 12
// result2: 100  
```
 
## 2. 参数类型：

 typeof **typeof obj == “object”** 构造函数属性：constructor 属性 **str.constructor == Array**

![20180115205725962.png](https://i.loli.net/2019/12/10/YZoJLzBAQcG9tvO.png)

 
### 实验二 —— 检查参数类型

 我们回头看一下实验一中存在一个问题就是如果在调用函数 addAll 时传入一个字符串会得到一个错误的结果。聪明的你肯定已经想到办法了，在遍历方法参数数组时判断 typeof arguments[i] == “number” 或者 arguments[i].constructor == Number 

 每次都这样去检查参数类型很累，当然我们可以写一个通用一点的检查参数的方法，来确保我们函数的输入。

 
```js
// 严格检查参数列表
// args: types Array 检查参数的类型数组
//       args Array 方法中的 arguments
var checkArguments = function(types, args) {
    // 检查参数数量
    if( types.length != args.length) {
        throw "参数数量异常：类型数量：" +  types.length + "，参数数量：" + args.length;
    }
    for(var i = 0; i < arguments.length; i++) {
        if(args[i].constructor != types[i]) {
            throw "参数类型异常：参数" + args[i] + "的类型为 " + args[i].constructor.name + " 检查的类型为：" + types[i].name ;
        }
    }
}

// 接受两个参数求和的方法
var addTwo = function() {
    checkArguments([Number,Number],arguments);
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

var result3 = addTwo(2, 6);
console.log("result3: " + result3); // 输出 result3: 8
// addTwo(1, "1"); // 输出 Uncaught 参数类型异常：参数1的类型为 String 检查的类型为：Number
addTwo(3, 4, 5); // 输出 Uncaught 参数数量异常：类型数量：2，参数数量：3
```
 知道了上面的 JS 对于方法参数长度和参数类型的判断方法之后，我们就可以来重载方法了。

 
### 实验三 —— 方法的重载为你推荐歌曲

 
```js
// 根据不同的参数推荐不同的歌曲
var playSomething = function() {
    if(arguments.length == 1) {
        if(arguments[0].constructor == Object) {
            console.log("Hey!sing Dog!"); // object not found
        }else {
            console.log("单身情歌");
        }   
    }else if(arguments.length == 2) {
        if(arguments[0].constructor != arguments[1].constructor) {
            console.log("有情人终成兄妹");
        }else{
            console.log("好心分手");
        }   
    }else if(arguments.length == 3) {
        console.log("圣诞节-红花会");
    }else {
        console.log("学会了"); // xixi, 学会了吗
    }
}

playSomething({name:"Dog"});
playSomething("达尔文","埃玛");
playSomething("pig",{name:"pig"});
playSomething("PG ONE","李小璐","贾乃亮");
playSomething("java","python","node","lua","php","swift","javascript");
// Hey!sing Dog!
// 好心分手
// 有情人终成兄妹
// 圣诞节-红花会
// 学会了
// Here with You <- 悄悄加的，不知道会不会被人发现
```
   
  