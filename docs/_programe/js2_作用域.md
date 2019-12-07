---
date: 2018-01-18 23:43
author: xiaop1ng
location: ShenZhen
title: JavaScript —— 作用域（二）
tags:
  - js
---

# JavaScript —— 作用域（二）

Javascript 语言特有的”链式作用域”结构（chain scope）

即子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

 
## 块作用域与函数作用域

 函数可以访问函数外部申明的变量，但是函数外部不能反过来访问函数内部的局部变量。

 **需要注意的是在 JavaScript 中，区域块（ `if`  、 `for` 、 `while` 、 `switch` 、 `try` ）内的变量是可以在区域块外部访问的。**

 
```
try {
    var value1 = "from try block"
}catch(e) {

}

if(true) {
    var value2 = "from block";
}

var f3 = function() {
    var value3 = "from function";
}
console.log("value1: " + value1); // value1: from try block
console.log("value2: " + value2); // value2: from block
console.log("value3: " + value3); // Uncaught ReferenceError: value3 is not defined
```
 
## 不要忽略  `var` 

 
> Yes，don’t ignore  `var` 
> 
>  
 不知道你刚开始写 JS 程序会不会在申明变量时忘掉写  `var`  ,反正最初的我是觉得写和不写没差而不写  `var`  

 在申明变量不写  `var`  的时候会申明一个全局变量。而在 HTML 文档中，所有全局变量都属于  `window`  对象中。

 也就是说你的全局变量，或者函数，可以覆盖  `window`  对象的变量或者函数。   
 局部变量，包括  `window`  对象可以覆盖全局变量和函数。

 
```
foo = "hello";

console.log(window.foo == foo); // true;

// 实时证明当 JavaScript 运行在浏览器中时，全局变量会作为 window 对象的属性

// location = "https://baidu.com"; // 全局变量 location 会让浏览器跳转至该链接
```
 需要补充说明的是在最外层的  `<script></script>`  中就算你使用  `var`  来声明变量和函数，这个成员也会归为  `window`  对象“所有”。对于这个现象我的理解是：最外层相当于是我们的最大的一个作用域，所以无论你怎么申明都会成为  `window`  的成员。

 
## 一图胜千言

 ![这里写图片描述](https://img-blog.csdn.net/20180118233921459?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhb3BpbmcwOTE1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

 这里的全局作用域是直接在  `<script></script>`  里、即 v1 、v2 的值会在  `window`  对象下，内层作用域可以访问外层的作用域，但是内层作用域里的值会被围墙围起来不让外层作用域访问。

 
## 疑问？

 
> 在 JS 里，我们有没有方法打破常规，在外层作用域访问内层作用域的值呢？
