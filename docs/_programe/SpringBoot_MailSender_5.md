---
date: 2018-08-14 15:28
author: xiaop1ng
location: ShenZhen
title: SpringBoot 邮件工具——MailSender（五）
tags:
  - SpringBoot
---


Spring Email 抽象的核心是 MailSender 接口，用于发送邮件，使用也是非常的方便， 一共三个步骤（添加依赖，配置，发送）：

引入官方的 starter：

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```


配置相关的邮箱服务器，账户密码信息：

```yml
# email
spring:
    mail:
      host: smtp.163.com
      username: 13227379709@163.com
      password: abcd1234
      properties:
        mail:
          smtp:
            auth: true
          starttls:
            enable: true
            required: true
```

使用时，我在注入一个 `JavaMailSender` 对象（`JavaMailSender` 继承自 `MailSender` 接口）

```java
@Autowired
private JavaMailSender sender;

@GetMapping("/send")
public String sendMail(){
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("13227379709@163.com");
    message.setTo("784516419@qq.com");
    message.setSubject("主题");
    message.setText("这是内容");
    sender.send(message);
    return "ok";
}
```