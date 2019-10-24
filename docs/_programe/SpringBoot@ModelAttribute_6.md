---
date: 2019-07-30 12:28
author: xiaop1ng
location: ShenZhen
title: SpringBoot 杂记——使用 @ModelAttribute 抽象 BaseController（六）
tags:
  - SpringBoot
---

# SpringBoot 杂记——使用 @ModelAttribute 抽象 BaseController（六）

## 前言
今天将 SpringBoot 更新到了最新的 release 版本，在一个请求方法中使用 `@RequestParam` 注解去获取参数时，然后 `@RequestParam` 的 required 的缺省值是 true 的，如果这时候我们的请求表单是一个大表单的请求，感觉写起这个参数列表不是很方便。当然我们可以将 `HttpServletRequest` 注入到请求方法中，然后手动入参，手动检查参数，这样做的好处是代码阅读起来比较方便。所以就需要一个 BaseController 来解决这些公共的问题。

## @ModelAttribute
关于 `@ModelAttribute`，被注解的方法或属性会执行于 `@RequestMapping` 之前。
> 在控制器的处理器方法参数上添加 @ModelAttribute 注解可以访问模型中的属性，如果不存在这个模型，则会自动将其实例化，产生一个新的模型。 模型属性还覆盖了来自 HTTP Servlet 请求参数的名称与字段名称匹配的值。

所以我们可以利用 `@ModelAttribute` 的特性，将我们需要的 `HttpServletRequest` 和 `HttpServletResponse` 注入到所有的控制器中。

所以我们的 BaseController 中需要这个方法：

```java
    protected HttpServletRequest request;

    protected HttpServletResponse response;

    protected HttpSession session;
    
    @ModelAttribute
    public void setBaseBizController(HttpServletRequest request,HttpServletResponse response){
        this.request=request;
        this.response=response;
        this.session=request.getSession();
    }

```

这时我们的业务请求处理类继承自 `BaseController` 就可以在业务方法中直接使用 `request` `response` `session` 对象了。

## 封装一些常用の方法
有了上面说的 `request` `response` `session` 对象之后，一切事情就变得顺其自然了。

```java
	/**
     * 获取请求对象
     */
    HttpServletRequest getRequest();

    /**
     * 获取响应对象
     */
    HttpServletResponse getResponse();

    /**
     * 获取会话对象
     */
    HttpSession getSession();

    /**
     * 获取请求Ip
     */
    String getIp();

    /**
     * 获取参数
     * @param paramName 参数名
     */
    String getStringParam(String paramName);

    /**
     * 获取参数
     * @param paramName 参数名
     * @param defaultValue 缺省值
     */
    String getStringParam(String paramName, String defaultValue);

    /**
     * 获取并校验参数非空
     * @param paramName 参数名
     */
    String requireStringParam(String paramName);

    /**
     * 获取并校验参数非空
     * @param paramName 参数名
     * @param tips 参数为空自定义提示
     */
    String requireStringParam(String paramName, String tips);

    int getIntParam(String paramName);

    int getIntParam(String paramName, int defaultValue);

    int requireIntParam(String paramName);

    int requireIntParam(String paramName, String tipsEmpty, String tipsNaN);

    long getLongParam(String paramName);

    long getLongParam(String paramName, long defaultValue);

    long requireLongParam(String paramName);

    long requireLongParam(String paramName, String tipsEmpty, String tipsNaN);

    double getDoubleParam(String paramName);

    double getDoubleParam(String paramName, double defaultValue);

    double requireDoubleParam(String paramName);

    double requireDoubleParam(String paramName, String tipsEmpty, String tipsNaN);

    /**
     * 获取请求参数map
     */
    Map getParamMap();
```

大家可以自己实现一下这些方法，然后就可以愉快的玩耍了，当然这里我写好了一个实现类，感兴趣的童靴可以看看。

[BaseBizController.java](https://github.com/xiaop1ng/PlayWithSpringBoot/blob/master/src/main/java/com/xiaoping/base/impl/BaseBizController.java)

## GitHub 地址
[PlayWithSpringBoot](https://github.com/xiaop1ng/PlayWithSpringBoot)