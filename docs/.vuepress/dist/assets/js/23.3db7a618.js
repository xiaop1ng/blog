(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{320:function(e,t,a){"use strict";a.r(t);var v=a(5),s=Object(v.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h2",{attrs:{id:"arthas-tunnel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#arthas-tunnel"}},[e._v("#")]),e._v(" Arthas Tunnel")]),e._v(" "),a("p",[a("code",[e._v("Arthas")]),e._v(" 是一个实用的调试工具，官方的介绍是 "),a("code",[e._v("Java")]),e._v(" 应用诊断利器")]),e._v(" "),a("ol",[a("li",[e._v("下载部署arthas tunnel server "),a("a",{attrs:{href:"https://github.com/alibaba/arthas/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/alibaba/arthas/releases"),a("OutboundLink")],1)])]),e._v(" "),a("blockquote",[a("p",[e._v("java -jar  arthas-tunnel-server.jar\n默认情况下，arthas tunnel server的web端口是8080，arthas agent连接的端口是7777。")])]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("在 "),a("code",[e._v("springboot")]),e._v(" 应用中添加依赖，并添加配置")])]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("    <dependency>\n        <groupId>com.taobao.arthas</groupId>\n        <artifactId>arthas-spring-boot-starter</artifactId>\n        <version>3.5.1</version>\n    </dependency>\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("arthas.agent-id=hsehdfsfghhwertyfad\narthas.tunnel-server=ws://<IP>:7777/ws\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br")])]),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[e._v("访问 127.0.0.1:8080")])]),e._v(" "),a("li",[a("p",[e._v("将配置好的 "),a("code",[e._v("agent-id")]),e._v(" 填入，连接即可")])])]),e._v(" "),a("h2",{attrs:{id:"常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[e._v("#")]),e._v(" 常用命令")]),e._v(" "),a("p",[a("code",[e._v("dashboard")]),e._v(" 查看进程状态")]),e._v(" "),a("blockquote",[a("p",[e._v("dashboard")])]),e._v(" "),a("p",[a("code",[e._v("jad")]),e._v(" 查看反编译线上代码")]),e._v(" "),a("blockquote",[a("p",[e._v("jad org.fzgang.core.business.modules.core.CoreProcess")])]),e._v(" "),a("p",[a("code",[e._v("watch")]),e._v(" 监听方法的返回值")]),e._v(" "),a("blockquote",[a("p",[e._v("watch org.fzgang.core.business.modules.core.asset.AssetProcess generatorProcess returnObj")])]),e._v(" "),a("p",[a("code",[e._v("exit")]),e._v(" or "),a("code",[e._v("quit")]),e._v(" 退出当前连接")]),e._v(" "),a("blockquote",[a("p",[e._v("exit")])]),e._v(" "),a("p",[a("code",[e._v("stop")]),e._v(" 完全退出 arthas")]),e._v(" "),a("blockquote",[a("p",[e._v("stop")])]),e._v(" "),a("p",[a("code",[e._v("jvm")]),e._v(" 查看 jvm 信息（如：垃圾收集器，内存，线程，系统等信息）")]),e._v(" "),a("blockquote",[a("p",[e._v("jvm")])]),e._v(" "),a("p",[a("code",[e._v("sysprop")]),e._v(" 查看或修改系统属性")]),e._v(" "),a("blockquote",[a("p",[e._v("sysprop")])]),e._v(" "),a("p",[e._v("修改单个属性值")]),e._v(" "),a("blockquote",[a("p",[e._v("sysprop user.name jianchaoping")])]),e._v(" "),a("p",[a("code",[e._v("sysenv")]),e._v(" 查看环境变量")]),e._v(" "),a("blockquote",[a("p",[e._v("sysenv")])]),e._v(" "),a("p",[a("code",[e._v("vmoption")]),e._v(" 查看或修改的 option")]),e._v(" "),a("blockquote",[a("p",[e._v("vmoption")])]),e._v(" "),a("p",[a("code",[e._v("perfcounter")]),e._v(" 当前JVM的 Perf Counter信息")]),e._v(" "),a("blockquote",[a("p",[e._v("perfcounter")])]),e._v(" "),a("p",[a("code",[e._v("logger")]),e._v(" 查看logger信息，修改logger level")]),e._v(" "),a("blockquote",[a("p",[e._v("logger")])]),e._v(" "),a("p",[e._v("修改 level")]),e._v(" "),a("blockquote",[a("p",[e._v("logger --name ROOT --level debug")])]),e._v(" "),a("p",[a("code",[e._v("getstatic")]),e._v(" 获取静态属性值\n使用方法为 "),a("code",[e._v("getstatic class_name field_name")])]),e._v(" "),a("blockquote",[a("p",[e._v("getstatic constant.Constatnt SERVER_PORT")])]),e._v(" "),a("p",[a("code",[e._v("mbean")]),e._v(" 查看 Mbean 的信息")]),e._v(" "),a("blockquote",[a("p",[e._v("mbean")])]),e._v(" "),a("p",[a("code",[e._v("headdump")]),e._v(" dump 到临时文件生成一个 hprof 文件")]),e._v(" "),a("blockquote",[a("p",[e._v("headdump")])]),e._v(" "),a("p",[a("code",[e._v("vmtool")]),e._v(" 利用JVMTI接口，实现查询内存对象，强制GC等功能")]),e._v(" "),a("p",[e._v("强制GC")]),e._v(" "),a("blockquote",[a("p",[e._v("vmtool --action forceGc")])]),e._v(" "),a("p",[a("code",[e._v("sc")]),e._v(" 查看 jvm 已加载的类信息")]),e._v(" "),a("blockquote",[a("p",[e._v("sc org.fzgang.*")])]),e._v(" "),a("p",[a("code",[e._v("sm")]),e._v(" 搜索出所有已经加载了 Class 信息的方法信息")]),e._v(" "),a("blockquote",[a("p",[e._v("sm java.lang.String")])]),e._v(" "),a("p",[a("code",[e._v("retransform")]),e._v(" 加载外部 class retransform到JVM里")]),e._v(" "),a("blockquote",[a("p",[e._v("retransform /tmp/Main.class")])]),e._v(" "),a("p",[a("code",[e._v("redefine")]),e._v(" 加载外部的.class文件，redefine jvm已加载的类。\n推荐使用 retransform 命令")]),e._v(" "),a("blockquote",[a("p",[e._v("redefine /tmp/Test.class")])]),e._v(" "),a("p",[a("code",[e._v("classloader")]),e._v(" 查看classloader的继承树，urls，类加载信息")]),e._v(" "),a("blockquote",[a("p",[e._v("classloader")])]),e._v(" "),a("p",[a("code",[e._v("profiler")]),e._v(" 生成火焰图 只支持 Linux/Mac\n启动")]),e._v(" "),a("blockquote",[a("p",[e._v("profiler start")])]),e._v(" "),a("p",[e._v("获取已采集例子数量")]),e._v(" "),a("blockquote",[a("p",[e._v("profiler getSamples")])]),e._v(" "),a("p",[e._v("查看profiler状态")]),e._v(" "),a("blockquote",[a("p",[e._v("profiler status")])]),e._v(" "),a("p",[e._v("停止profiler生成svg格式结果")]),e._v(" "),a("blockquote",[a("p",[e._v("profiler stop")])]),e._v(" "),a("p",[e._v("粘贴：shift + inster\n复制：Ctrl + inster")]),e._v(" "),a("h2",{attrs:{id:"官方文档"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#官方文档"}},[e._v("#")]),e._v(" 官方文档")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://arthas.aliyun.com/doc/advanced-use.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://arthas.aliyun.com/doc/advanced-use.html"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/alibaba/arthas",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/alibaba/arthas"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=s.exports}}]);