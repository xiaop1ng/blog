(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{294:function(a,t,n){"use strict";n.r(t);var s=n(4),r=Object(s.a)({},(function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("h1",{attrs:{id:"springboot-端点监控工具——actuator-使用（四）"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#springboot-端点监控工具——actuator-使用（四）"}},[a._v("#")]),a._v(" SpringBoot 端点监控工具——actuator 使用（四）")]),a._v(" "),n("h2",{attrs:{id:"springboot-actuator"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#springboot-actuator"}},[a._v("#")]),a._v(" SpringBoot actuator")]),a._v(" "),n("p",[a._v("SpringBoot actuator 是一个对应用运行状态监视的工具，actuator 为我们提供了很多可以被监视的端点（Endpoints），同时也支持我们自定端点（Endpoint）。")]),a._v(" "),n("h2",{attrs:{id:"先启动-actuator"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#先启动-actuator"}},[a._v("#")]),a._v(" 先启动 actuator")]),a._v(" "),n("p",[a._v("首先在我们的 SpringBoot 应用中添加上 "),n("code",[a._v("actuator")]),a._v(" 的依赖")]),a._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("<dependency>\n\t<groupId>org.springframework.boot</groupId>\n\t<artifactId>spring-boot-starter-actuator</artifactId>\n</dependency>\n")])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br"),n("span",{staticClass:"line-number"},[a._v("4")]),n("br")])]),n("p",[a._v("相关配置：")]),a._v(" "),n("ul",[n("li",[a._v("application.yml")])]),a._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("# info 配置项（/actuator/info）\ninfo:\n  author: xiaop1ng\n  email: jianchaoping@gmail.com\n  version: 1.0.0\n\n# 配置 actuator 加载所有的端点\nmanagement:\n  endpoints:\n    web:\n      exposure:\n        include: '*'\n  endpoint:\n    health:\n      show-details: always\n")])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br"),n("span",{staticClass:"line-number"},[a._v("4")]),n("br"),n("span",{staticClass:"line-number"},[a._v("5")]),n("br"),n("span",{staticClass:"line-number"},[a._v("6")]),n("br"),n("span",{staticClass:"line-number"},[a._v("7")]),n("br"),n("span",{staticClass:"line-number"},[a._v("8")]),n("br"),n("span",{staticClass:"line-number"},[a._v("9")]),n("br"),n("span",{staticClass:"line-number"},[a._v("10")]),n("br"),n("span",{staticClass:"line-number"},[a._v("11")]),n("br"),n("span",{staticClass:"line-number"},[a._v("12")]),n("br"),n("span",{staticClass:"line-number"},[a._v("13")]),n("br"),n("span",{staticClass:"line-number"},[a._v("14")]),n("br"),n("span",{staticClass:"line-number"},[a._v("15")]),n("br")])]),n("p",[a._v("启动 SpringBoot 应用程序后访问路由 "),n("code",[a._v("/actuator/info")])]),a._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v('// http://127.0.0.1:3000/actuator/info\n\n{\n  "author": "xiaop1ng",\n  "email": "jianchaoping@gmail.com",\n  "version": "1.0.0"\n}\n')])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br"),n("span",{staticClass:"line-number"},[a._v("4")]),n("br"),n("span",{staticClass:"line-number"},[a._v("5")]),n("br"),n("span",{staticClass:"line-number"},[a._v("6")]),n("br"),n("span",{staticClass:"line-number"},[a._v("7")]),n("br")])]),n("p",[a._v("然后接着我们可以试一试其他的端点监控的路由")]),a._v(" "),n("ul",[n("li",[n("code",[a._v("/actuator/autoconfig")]),a._v(" 应用的自动化配置报告")]),a._v(" "),n("li",[n("code",[a._v("/actuator/beans")]),a._v("  应用上下文创建的所有 Bean")]),a._v(" "),n("li",[n("code",[a._v("/actuator/configprops")]),a._v(" 应用中配置的属性信息报告")]),a._v(" "),n("li",[n("code",[a._v("/actuator/env")]),a._v(" 环境属性报告")]),a._v(" "),n("li",[n("code",[a._v("/actuator/mappings")]),a._v(" SpringMVC 的控制器映射关系报告")]),a._v(" "),n("li",[n("code",[a._v("/actuator/info")]),a._v(" 自定义的配置信息")]),a._v(" "),n("li",[n("code",[a._v("/actuator/metrics")]),a._v(" 当前应用的各类重要度量指标")]),a._v(" "),n("li",[n("code",[a._v("/actuator/health")]),a._v(" 应用的各类健康指标信息")]),a._v(" "),n("li",[n("code",[a._v("/actuator/threaddump")]),a._v(" 用来暴露程序运行中的线程信息")]),a._v(" "),n("li",[n("code",[a._v("/actuator/httptrace")]),a._v(" 显示HTTP跟踪信息（默认显示最后100个HTTP请求）")]),a._v(" "),n("li",[n("code",[a._v("/actuator/scheduledtasks")]),a._v(" 计划任务\n...")])]),a._v(" "),n("h2",{attrs:{id:"其他"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[a._v("#")]),a._v(" 其他")]),a._v(" "),n("p",[n("code",[a._v("actuator")]),a._v(" 为我们提供了 API 的方式来监控各个端点的实时信息，"),n("a",{attrs:{href:"https://github.com/codecentric/spring-boot-admin",target:"_blank",rel:"noopener noreferrer"}},[a._v("Spring Boot Admin"),n("OutboundLink")],1),a._v(" 为我们提供一套 web 可视化页面来查看端点信息，感兴趣的可以研究研究，附一张图。\n"),n("img",{attrs:{src:"https://img-blog.csdn.net/20180803154916874?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9waW5nMDkxNQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70",alt:"sba"}})])])}),[],!1,null,null,null);t.default=r.exports}}]);