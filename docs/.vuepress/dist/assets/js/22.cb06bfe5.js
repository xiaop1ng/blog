(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{317:function(v,_,t){"use strict";t.r(_);var a=t(5),e=Object(a.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h2",{attrs:{id:"数据系统基础"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据系统基础"}},[v._v("#")]),v._v(" 数据系统基础")]),v._v(" "),t("p",[v._v('那么什么算是 “数据密集型" (data-intensive)呢？\n对于一个应用系统， 如果 “数据“ 是其成败决定性因素， 包括数据的规模 、 数据的复杂度或者数据产\n生与变化的速率等， 我们就可以称为 “数据密集型应用系统”；与之对应的是计算密集型，CPU 主频往往是后者最大的制约瓶颈。')]),v._v(" "),t("ul",[t("li",[v._v("可靠性 -> 容忍硬件、软件失效等错误、容忍用户出现不正确的软件使用方法（确保功能正确）")]),v._v(" "),t("li",[v._v("可扩展性 -> 负载、性能、延迟（解决规模增长问题）")]),v._v(" "),t("li",[v._v("可维护性 -> 可运维（平稳运行）、简单性（降低复杂性）、可演化性（可塑性，易改性）")])]),v._v(" "),t("blockquote",[t("p",[v._v("互联网做得太出色了， 以至于很多人把它看作某种像太平洋 一样的自然资源， 而非人造的。 你还记得上一个达到如此规模而又这样健壮的技术是什么？")])]),v._v(" "),t("ol",[t("li",[t("p",[v._v("TimeLine: 当用户查看 TimeLine 时，先查询所有关注的对象，列出这些人的动态，最后按时间倒序排序")])]),v._v(" "),t("li",[t("p",[v._v("TimeLine: 对每个用户的时间线维护一个缓存，当用户发送动态时，查询他的 Follower，将动态插入到每个关注者的 TimeLine 缓存中")])]),v._v(" "),t("li",[t("p",[v._v("结合1和2，对于关注量大的账户采用方式1，对于关注量正常的采用方式2，用户在查看 TimeLine 时读取自己的 TimeLine 缓存（方案2）和查询受关注\n量大的对象，列出这些人的动态，最后合并两个结果集")])])]),v._v(" "),t("p",[v._v("运行的延迟和响应时长")]),v._v(" "),t("p",[v._v("垂直扩展：升级到更强大的机器\n水平扩展：将负载分布到多个更小的机器")]),v._v(" "),t("p",[v._v("简化系统设计并不意味着减少系统功能")]),v._v(" "),t("blockquote",[t("p",[v._v("语言的边界就是世界的边界")])]),v._v(" "),t("p",[v._v("个人觉得也可以说：想象力的边界就是世界的边界。")]),v._v(" "),t("p",[v._v("字节表示方式：（电流、磁场、光脉冲）")]),v._v(" "),t("h3",{attrs:{id:"数据处理系统一般包含"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据处理系统一般包含"}},[v._v("#")]),v._v(" 数据处理系统一般包含")]),v._v(" "),t("ul",[t("li",[v._v("数据库")]),v._v(" "),t("li",[v._v("缓存")]),v._v(" "),t("li",[v._v("索引")]),v._v(" "),t("li",[v._v("异步消息")]),v._v(" "),t("li",[v._v("批处理")])]),v._v(" "),t("p",[v._v("应用开发者，同时也是数据系统设计师")]),v._v(" "),t("p",[v._v("在网络模型中，链接的访问路径，不是用外键记录，而更像是编程语言中的指针。访问路径像是遍历链表。")]),v._v(" "),t("p",[v._v("MySQL 在 alert table 时会把现在的整张表复制")]),v._v(" "),t("p",[v._v("图状数据模型")]),v._v(" "),t("p",[v._v("社交网络，顶点是人，边指示那些人彼此认识")]),v._v(" "),t("p",[v._v("广义的日志：一个仅能追加的记录序列集合")]),v._v(" "),t("p",[v._v("由于每次写数据时，需要更新索引，因此任何类型的索引通常都会降低写的速度。")]),v._v(" "),t("p",[v._v("特殊的删除记录（墓碑）")]),v._v(" "),t("p",[v._v("Datalog语言")]),v._v(" "),t("p",[v._v("数据库核心：数据结构")]),v._v(" "),t("h2",{attrs:{id:"分布式数据系统"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#分布式数据系统"}},[v._v("#")]),v._v(" 分布式数据系统")]),v._v(" "),t("blockquote",[t("p",[v._v("如果你把东西整理得井井有条，下次就不用查找了。")])]),v._v(" "),t("h2",{attrs:{id:"派生数据"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#派生数据"}},[v._v("#")]),v._v(" 派生数据")]),v._v(" "),t("h3",{attrs:{id:"向后兼容"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#向后兼容"}},[v._v("#")]),v._v(" 向后兼容")]),v._v(" "),t("p",[v._v("较新的代码可以读取由旧代码编写的数据。")]),v._v(" "),t("h3",{attrs:{id:"向前兼容"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#向前兼容"}},[v._v("#")]),v._v(" 向前兼容")]),v._v(" "),t("p",[v._v("较旧的代码可以读取由新代码编写的数据。")]),v._v(" "),t("blockquote",[t("p",[v._v("成功的技术应首先处理现实问题，因为现实无法被愚弄。")])]),v._v(" "),t("blockquote",[t("p",[v._v("一个可能出错的事物与 一个不可能出错的事物之间的主要区别是， 当 一个不可能出错的事物出错了， 通常也就意味着不可修复。")])]),v._v(" "),t("h2",{attrs:{id:"事务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事务"}},[v._v("#")]),v._v(" 事务")]),v._v(" "),t("p",[v._v("从理论上来讲，隔离是假装没有发生并发")]),v._v(" "),t("p",[v._v("读倾斜（skew）：不可重复读，发生于两个读操作 ReadA、ReadB 中间穿插了一个写操作 WriteC，读取到的 A，B 的值不对。A 的值是写之前的值，而 B 的值已经是写之后的值了")]),v._v(" "),t("p",[v._v("多版本技术实现快照级别隔离可以解决读倾斜的问题，即确保读到同版本的数据。")]),v._v(" "),t("blockquote",[t("p",[v._v("FOR UPDATE指令指示数据库对返回的所有结果行要加锁。")])]),v._v(" "),t("p",[v._v("系统越大，其中局部组件失效的概率就越大")]),v._v(" "),t("blockquote",[t("p",[v._v("依赖同步的时间")])]),v._v(" "),t("p",[v._v("一天可能不总是 86400秒")]),v._v(" "),t("h3",{attrs:{id:"一致性与共识"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一致性与共识"}},[v._v("#")]),v._v(" 一致性与共识")]),v._v(" "),t("blockquote",[t("p",[v._v("错误的活着还是正确的挂掉")])]),v._v(" "),t("blockquote",[t("p",[v._v("如果船长的最高目标是保住他的船，那么他只能永远待在港口")])])])}),[],!1,null,null,null);_.default=e.exports}}]);