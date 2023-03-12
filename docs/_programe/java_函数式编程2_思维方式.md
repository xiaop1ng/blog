---
date: 2018-07-23 11:22
author: xiaop1ng
location: ShenZhen
title: Java 函数式编程（二）—— 函数式编程思想
tags:
  - Java
---


## 关于命令式、声明式和函数式

 
> 命令式编程：关注过程，需要定义程序的每一步，告诉他迭代的每个元素，命令式编程提供了完全的控制权

 
```java
public static void main(String[] args) {
    List<String> pickList = Arrays.asList("Java", "Python", "Lua", "C++", "PHP", "JavaScript");
    String res = pickBestLangue(pickList);
    if(res.equals("NotFound.")) {
        System.out.println("best langue not found.");
    }else {
        System.out.println(res + " is the best langue."); // 嗯，PHP 是世界上最好的语言
    }
}

private static String pickBestLangue(List<String> pickList) {
    String result = "NotFound.";
    for (String item : pickList) {
        if(item.equals("PHP")) {
            result = item;
            break;
        }
    }
    return result;
}
```
 
> 声明式编程：仍然需要告诉程序需要做什么，但是很多细节留给了底层的函数库。
 
 
```java
private static String pickBestLangue(List<String> pickList) {
    String result = "NotFound.";
    if(pickList.contains("PHP")) {
        result = "PHP";
    }
    return result;
}
```
 
> 函数式编程：使用高阶函数来完成任务，函数式编程在弱语言（如：JavaScript）中很普及使用。拥有更好的表达能力。
> 
>  
 
```java
private static String pickBestLangue(List<String> pickList) {
    return pickList.stream()
                    .filter(i -> i.equals("PHP"))
                    .findFirst()
                    .orElse("NotFound.");
}
```
  
  * 函数式代码比命令式代码更简洁。可读性更好。 
  * 函数式代码不会表现出明显的易变性，而且使用了更少的垃圾变量。 

# Java 中的高阶函数

 在 Java 中，要将对象传递给方法，在方法内创建对象，并从方法中返回对象。可以对函数执行同样的操作。也就是说，可以将函数传递给方法，在方法内创建函数，并从方法返回函数。   
 在此上下文中，方法 是类的一部分 — 静态或实例 — 但函数对于方法而言是本地函数，不能特意与类或实例关联。可以接收、创建或返回函数的函数或方法被视为高阶函数。

 
## 关于语句与表达式

 当我们在代码库中查找 `for`，可能会惊奇地发现，代码中对 `for` 循环的使用非常频繁。好像只要我们需要循环，似乎就会用到 `for`。   
 在 Java 中，`for` 和 `while` 都是语句。语句执行一个操作，但不会生成任何结果。就本质而言，任何执行有用的操作的语句都会导致数据变化。这是语句表达其效果的唯一方式。而表达式则相反：它们可以得出结果而不会导致变化。   
 所以当我们的 `for` 或式 `while` 控制循环的过程中不需要改变被遍历的集合或是数组时，请考虑使用表达式而不是循环语句。

 
## 写在最后

 在命令式编程中，对于大部分数据处理，通常都会使用 for 和 while 循环。在本文中，我们了解了一种在函数式编程中非常流行的替代方法。函数组合是一项简单技术，有助于对模块化函数进行排序，从而创建更复杂的运算。按该序列处理数据时，得到了一个集合管道。结合使用函数组合和集合管道模式，可以创建复杂的程序，让数据从上游流到下游，并经历一系列转换。

   
  