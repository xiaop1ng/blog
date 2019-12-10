---
date: 2018-08-03 15:28
author: xiaop1ng
location: ShenZhen
title: SpringBoot 端点监控工具——actuator 使用（四）
tags:
  - SpringBoot
---

# SpringBoot 端点监控工具——actuator 使用（四）

## SpringBoot actuator 
SpringBoot actuator 是一个对应用运行状态监视的工具，actuator 为我们提供了很多可以被监视的端点（Endpoints），同时也支持我们自定端点（Endpoint）。

## 先启动 actuator

首先在我们的 SpringBoot 应用中添加上 `actuator` 的依赖

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

相关配置：
- application.yml

```yml
# info 配置项（/actuator/info）
info:
  author: xiaop1ng
  email: jianchaoping@gmail.com
  version: 1.0.0

# 配置 actuator 加载所有的端点
management:
  endpoints:
    web:
      exposure:
        include: '*'
  endpoint:
    health:
      show-details: always
```

启动 SpringBoot 应用程序后访问路由 `/actuator/info`
```json
// http://127.0.0.1:3000/actuator/info

{
  "author": "xiaop1ng",
  "email": "jianchaoping@gmail.com",
  "version": "1.0.0"
}
```

然后接着我们可以试一试其他的端点监控的路由
- `/actuator/autoconfig` 应用的自动化配置报告
-  `/actuator/beans`  应用上下文创建的所有 Bean
-  `/actuator/configprops` 应用中配置的属性信息报告
-  `/actuator/env` 环境属性报告
-  `/actuator/mappings` SpringMVC 的控制器映射关系报告
-  `/actuator/info` 自定义的配置信息
-  `/actuator/metrics` 当前应用的各类重要度量指标
-  `/actuator/health` 应用的各类健康指标信息
-  `/actuator/threaddump` 用来暴露程序运行中的线程信息
-  `/actuator/httptrace` 显示HTTP跟踪信息（默认显示最后100个HTTP请求）
-  `/actuator/scheduledtasks` 计划任务
...

## 其他
`actuator` 为我们提供了 API 的方式来监控各个端点的实时信息，[Spring Boot Admin](https://github.com/codecentric/spring-boot-admin) 为我们提供一套 web 可视化页面来查看端点信息，感兴趣的可以研究研究，附一张图。

![](https://i.loli.net/2019/12/10/QUqzd2wNlZI3xHX.png)
