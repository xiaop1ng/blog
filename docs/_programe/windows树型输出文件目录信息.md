---
date: 2020-03-12 19:06
author: xiaop1ng
location: ShenZhen
title: Windows 树形输出目录信息
---

### 方法

在 Windows 下， 命令行进入目标文件夹：

> tree/f>readme.txt
此时会在目标文件夹下输出一个 readme.txt 文件，该文件以树形的机构描述了目标文件的目录结构


### 我们会得到一个类似下面这样的文本文件

```txt
文件夹 PATH 列表
卷序列号为 EC88-FED3
D:.
├─out
├─public
│  ├─css
│  ├─js
│  └─images
├─src
│  ├─files
│  ├─dat
│  │  └─index
│  │      ├─Excel
│  │      └─db
│  ├─module
│  └─refs
├─log
│  ├─logs
│  │  └─r
│  ├─data
│  │  └─ex
│  ├─examples
│  │  ├─ex
│  │  ├─rad
│  │  ├─vote
│  │  ├─edu
│  │  │  └─outputs
│  │  ├─d2020
│  │  └─d2019
│  ├─Out
│  └─refs
└─test
    └─b1_test
        └─b1_refs
```











































