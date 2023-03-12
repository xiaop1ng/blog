---
date: 2018-08-03 11:28
author: xiaop1ng
location: ShenZhen
title: SpringBoot CLI 的使用（三）
tags:
  - SpringBoot
---


CLI （Command Line Interface）， 一个可以帮助我们快速构建 SpringBoot 应用的命令行工具。

我们知道 SpringBoot 已经简化 Spring 应用中很多繁琐的配置和构建工程的步骤，然而 SpringBoot CLI 工具在这个基础上继续简化了 SpringBoot 应用程序的构建。

## Quik Start
首先需要下载 CLI，下载地址：  http://repo.spring.io/release/org/springframework/boot/spring-boot-cli/

我们这里选择的是 2.0.1.RELEASE 版本
http://repo.spring.io/release/org/springframework/boot/spring-boot-cli/2.0.1.RELEASE/spring-boot-cli-2.0.1.RELEASE-bin.zip

下载完成后解压，然后将解压出来的 `/bin` 目录添加至环境变量中
在 `cmd` 程序中输入 `spring --version` 会输出
> Spring CLI v2.0.1.RELEASE

即表明安装配置成功
然后我们写一段 Java 程序测试一下

- Hello.java
```java
@RestController
public class Hello {
    @RequestMapping("/hello")
    public String hello() {
        return "Hello, Cli";
    }
}
```
将 `cmd` 程序切换至 `Hello.java` 文件所在目录下执行 `spring run Hello.java`

![](https://i.loli.net/2019/12/10/h68bpEuskmZGiP1.png)

SpringBoot CLI 在这时会构建并启动程序，启动完成后，访问 http://127.0.0.1:8080/hello

> Hello, Cli

到这里我们的测试就已经通过了