---
date: 2021-10-23 16:20
author: xiaop1ng
location: ShenZhen
title: 实用工具推荐 Arthas Tunnel
tags:
  - Java
---
## Arthas Tunnel

`Arthas` 是一个实用的调试工具，官方的介绍是 `Java` 应用诊断利器

1. 下载部署arthas tunnel server [https://github.com/alibaba/arthas/releases](https://github.com/alibaba/arthas/releases)
> java -jar  arthas-tunnel-server.jar
默认情况下，arthas tunnel server的web端口是8080，arthas agent连接的端口是7777。

2. 在 `springboot` 应用中添加依赖，并添加配置
```
    <dependency>
        <groupId>com.taobao.arthas</groupId>
        <artifactId>arthas-spring-boot-starter</artifactId>
        <version>3.5.1</version>
    </dependency>
```

```
arthas.agent-id=hsehdfsfghhwertyfad
arthas.tunnel-server=ws://<IP>:7777/ws
```

3. 访问 127.0.0.1:8080 

4. 将配置好的 `agent-id` 填入，连接即可

## 常用命令

`dashboard` 查看进程状态

> dashboard

`jad` 查看反编译线上代码

> jad org.fzgang.core.business.modules.core.CoreProcess

`watch` 监听方法的返回值

> watch org.fzgang.core.business.modules.core.asset.AssetProcess generatorProcess returnObj

`exit` or `quit` 退出当前连接
> exit

`stop` 完全退出 arthas
> stop

`jvm` 查看 jvm 信息（如：垃圾收集器，内存，线程，系统等信息）
> jvm

`sysprop` 查看或修改系统属性
> sysprop

修改单个属性值
> sysprop user.name jianchaoping

`sysenv` 查看环境变量
> sysenv

`vmoption` 查看或修改的 option
> vmoption

`perfcounter` 当前JVM的 Perf Counter信息
> perfcounter

`logger` 查看logger信息，修改logger level
> logger

修改 level
> logger --name ROOT --level debug

`getstatic` 获取静态属性值
使用方法为 `getstatic class_name field_name`
> getstatic constant.Constatnt SERVER_PORT

`mbean` 查看 Mbean 的信息
> mbean

`headdump` dump 到临时文件生成一个 hprof 文件
> headdump

`vmtool` 利用JVMTI接口，实现查询内存对象，强制GC等功能

强制GC
> vmtool --action forceGc

`sc` 查看 jvm 已加载的类信息

> sc org.fzgang.*

`sm` 搜索出所有已经加载了 Class 信息的方法信息  
> sm java.lang.String

`retransform` 加载外部 class retransform到JVM里
> retransform /tmp/Main.class

`redefine` 加载外部的.class文件，redefine jvm已加载的类。
推荐使用 retransform 命令
> redefine /tmp/Test.class

`classloader` 查看classloader的继承树，urls，类加载信息
> classloader

`profiler` 生成火焰图 只支持 Linux/Mac
启动
> profiler start

获取已采集例子数量
> profiler getSamples

查看profiler状态
> profiler status

停止profiler生成svg格式结果
> profiler stop


粘贴：shift + inster
复制：Ctrl + inster

## 官方文档

- [https://arthas.aliyun.com/doc/advanced-use.html](https://arthas.aliyun.com/doc/advanced-use.html)
- [https://github.com/alibaba/arthas](https://github.com/alibaba/arthas)
