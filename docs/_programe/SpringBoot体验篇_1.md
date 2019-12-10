---
date: 2018-04-11 11:00
author: xiaop1ng
location: ShenZhen
title: SpringBoot 开箱使用 (一)
tags:
  - SpringBoot
---

# SpringBoot 开箱使用 (一)

Spring Boot 是一个崭新的令人兴奋的项目，它以 Spring 的视角，致力于简化 Spring 本身。

## Spring Boot 是什么？
Spring Boot 的目的是提供一组工具，以便快速构建容易配置的 Spring 应用程序。
Spring Boot 支持约定而非配置，旨在让您尽快启动并运行。
我所理解的 Spring Boot 是 Sping 家族的一个大合集，可以让我们更容易的构建 Spring 程序（更少的 XML 配置）

[Spring 官网](http://projects.spring.io/spring-boot) 这样介绍 SpringBoot

> Takes an opinionated view of building production-ready Spring applications. Spring Boot favors convention over configuration and is designed to get you up and running as quickly as possible.

这一切听起来很不错，对吧？ 
> Spring Boot 是一个崭新的令人兴奋的项目，它以 Spring 的视角，致力于简化 Spring 本身。

## 首先，它很有主见
Spring Boot 拥有观点。换句话说，Spring Boot 拥有合理的默认值，所以您可以使用这些常用值快速构建应用程序。

例如，Tomcat 是一个非常流行的 Web 容器。默认情况下，Spring Boot Web 应用程序使用了一个嵌入式 Tomcat 容器。

## 其次，它可以自定义
如果无法改变其想法，具有主见的框架就不是很好的框架。您可以根据自己的喜好轻松地自定义 Spring Boot 应用程序，无论是在进行初始配置时还是在开发周期的后期阶段。

例如，如果喜欢 Maven，可以轻松地在 POM 文件中更改 `<dependency>` 来替换 Spring Boot 默认值。

## Quick Start

使用 Maven 来构建项目

**Step 1**：在新建项目的 pom 文件中添加

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.1.RELEASE</version>
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```
**Step 2**: 在我们的项目下创建一个 Java 文件 Example.java

```java
/**
 * `@EnableAutoConfiguration`
 * 这个注解告诉Spring Boot根据添加的jar依赖猜测你想如何配置Spring。
 * 由于spring-boot-starter-web添加了Tomcat和Spring MVC，所以auto-configuration将假定你正在开发一个web应用，并对Spring进行相应地设置。
 * 
 */
@Controller
@EnableAutoConfiguration
public class Example {

    @RequestMapping("/")
    @ResponseBody
    String home() {
        return "SpringBoot is run";
    }
    
    public static void main(String[] args) throws Exception {
    	// SpringApplication 将引导我们的应用，启动 Spring，相应地启动被自动配置的 Tomcat web 服务器。
// 我们需要将 Example.class 作为参数传递给 run 方法，以此告诉 SpringApplication 谁是主要的 Spring 组件，并传递 args 数组以暴露所有的命令行参数。    
        SpringApplication.run(Example.class, args);
    }
}
```

这时程序可以启动了。你应该会看到：
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.0.1.RELEASE)
```

使用浏览器访问 127.0.0.1:8080 ,我们应该会看到

> SpringBoot is run

## 开发者工具
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```
## 自动重启

如果应用使用 spring-boot-devtools ，则只要 classpath 下的文件有变动，它就会自动重启。这在使用 IDE 时非常有用，因为可以很快得到代码改变的反馈。默认情况下，classpath 下任何指向文件夹的实体都会被监控