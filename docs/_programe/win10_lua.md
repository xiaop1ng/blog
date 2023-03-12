---
date: 2017-07-08 14:55
author: xiaop1ng
location: ShenZhen
title: 【Lua】Windows 10 编译 Lua 源码
tags:
  - Lua
---

## 环境准备

 
> 系统：Windows10   
> 编译工具： Visual Studio 2015   
> 源码： Lua 5.3.4
 
安装 Lua 可以采用安装 LuaForWindows.exe 的方式，这种方式是很方便很好用，可是往往这种方式只能给到一个非最新版的安装程序。我们可以通过编译官网给出的源码包自行编译从而获取最新版的目的。

Visual Studio 2015 社区版的离线包

> ed2k://|file|cn_visual_studio_community_2015_x86_dvd_6847368.iso|4013920256|EB7F6605EDE67509E218E29173AC6574|/

或者去[官网](https://visualstudio.microsoft.com/zh-hans/downloads/)下载社区版程序

需要注意的是在安装的时候需要勾选上 C++ 的开发人员工具包

Lua 源码，这里可以去 [www.lua.org](https://www.lua.org/) 官网上获取最新的源码包
 
> [https://www.lua.org/ftp/lua-5.3.4.tar.gz](https://www.lua.org/ftp/lua-5.3.4.tar.gz)

下载完成得到一个压缩包我们将其解压出来，我这里是放在 C盘根目录下

 
## 开始吧！

首先我们找到 VS2015 开发人员命令提示打开它

![](https://p-1251746955.cos.ap-shenzhen-fsi.myqcloud.com/20170708143923399.png)



然后切换至刚刚我们解压缩出来的 Lua 下的 src 文件夹下，我这里将 lua-5.3.4 文件夹名字改为了 lua
 
> cd /d c:/lua/src  

切换至 lua 源码包的 src 下之后执行

 
```
cl /MD /O2 /c /DLUA_BUILD_AS_DLL *.c  
ren lua.obj lua.o  
ren luac.obj luac.o  
link /DLL /IMPLIB:lua5.3.4.lib /OUT:lua5.3.4.dll *.obj  
link /OUT:lua.exe lua.o lua5.3.4.lib  
lib /OUT:lua5.3.4-static.lib *.obj  
link /OUT:luac.exe luac.o lua5.3.4-static.lib 
```
![](https://p-1251746955.cos.ap-shenzhen-fsi.myqcloud.com/20170708145019810.png)


 这时我们可以去查看 lua 源包下的 src 目录

![](https://p-1251746955.cos.ap-shenzhen-fsi.myqcloud.com/20170708145149594.png)


 这表明编译 Lua 源码工程已完成，此时我们将 C:\lua\src; 配置到 Path 环境变量下即可愉快的使用 lua 命令了。

![](https://p-1251746955.cos.ap-shenzhen-fsi.myqcloud.com/20170708145351382.png)

 
## 参考文章
 
- [http://www.imooc.com/article/4435](http://www.imooc.com/article/4435)
   
  