---
date: 2019-04-15 11:28
author: xiaop1ng
location: ShenZhen
title: 使用 Elasticsearch 构建一个笔记搜索引擎——求索
---

# 使用 Elasticsearch 构建一个笔记搜索引擎——求索

> 路漫漫其修远兮，吾将上下而求索。


搜索引擎的名字取自屈原的《离骚》，大家都知道在 E 文中单词 `search` 是搜索的意思，而 `research` 则是研究的意义，这也是反复搜索所存在的价值。

所以对于个人而言，希望存在一个可以搜索过往笔记博客以及一些琐碎的片段的工具。所以我们可以利用 `Elasticsearch` 构建了一个这样的工具。

![](https://img-blog.csdnimg.cn/img_convert/f1e72871ac993031a0ee826fafcdc2b7.png)

# Elasticsearch 是什么

es 是一个基于 Lucene 的搜索服务器。它提供一个分布式多用户能力的全文搜索引擎。

它用于全文搜索、结构化搜索、分析以及将这三者混合使用。

还有很多需要了解的概念如：集群和节点、索引、类型、文档等就不在此一一赘述了，下面贴出官方给出的文档地址：

<https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html>  （中文、版本旧但不影响理解概念）

<https://www.elastic.co/guide/en/elasticsearch/reference/master/index.html>  （E 文、版本可选到最新）



es 在我们的求索中担当了存储和全文搜索的职责。



# 开始吧

**目标**：实现能够准确命中我们关键词所匹配的笔记文档。

如上文所说我们的文档是准备存储在 es 里面的，这里是利用 es 提供的 RESTful API 直接将文档数据存储在 es 里，当然喜欢数据库的同学完全可以在数据库中也存储一份。

![](https://img-blog.csdnimg.cn/img_convert/6aa86c140a03756de2b9e4b4fc291091.png)

为了使用方便，这里的做法是直接用 markdown 文件来记录文档内容，当然喜欢富文本的同学可以扩展一下。

文档管理的功能：

- Refresh 刷新
- Import 批量导入 md 文件为文档
- New 创建
- DeleteBatch 批量删除
- Preview 预览
- Edit 编辑
- Delete 删除

这些功能都是直接调用 es 提供的 RESTful API 实现，包括我们前端的搜索功能也是在调用 es 的接口。这样看来 es 是不是很棒棒阿，需要提到的是批量导入 md 文档这个功能并没有真正的上传文件到服务端，而是在浏览器端直接读取文件内容，然后批量提交到 es 里面。


**实现**：

当我们键入关键词 `知识 Java` 时，es 会将搜索关键词分词，这个例子里的分词会很简单，空格分词分为 `知识` 和  `Java` ，然后使用一种叫做倒序索引（inverted index）的结构来做快速的全文索引。倒序索引由在文档中出现的唯一的单词列表，以及对于每个单词在文档中的位置组成。匹配得到的结果按照得分（匹配度和权重）来排序搜索结果，然后这里的高亮显示匹配词也是 es 提供的高亮搜索。
![](https://img-blog.csdnimg.cn/img_convert/2b0bdca416daa475aaee3dd7d6850b5e.png)



最后这里的结果页是使用 `marked` 来将 markdown 文档转换为 html 文档。

**倒序索引**和**高亮搜索**的具体内容请查阅官方文档，上面会有详尽的解释。

**对于搜索的思考**：

如果互联网没有搜索引擎，就像字典没有了 ABCD...XYZ 索引表，从这里也可以看出我们对搜索引擎的期望值：**快速**和**准确**。而我们在使用普通的全文索引时，通常也只能大致命中，举个例子：我们在搜索 “乐可可口”，搜索引擎应该要给我们返回“可口可乐”的结果；在我们搜索“Baidu”、“BD”或是“百度”时都应该需要得到“百度一下”的结果才对；在我们搜索“开心”时，理所当然的时“高兴”、“兴奋”等同义或接近的词都应该被匹配到。令人兴奋的事情是：这些我们通过 es 的一些插件是都可以很好的得到实现。



# GitHub

<https://github.com/xiaop1ng/search> 



# 也许你会遇到的一些问题

- es 只能本地（localhost）访问：

解决方法：

配置 `config\elasticsearch.yml`

```yml
# 服务绑定地址，不配置则只能 localhost 访问
network.host: 0.0.0.0
```
- 浏览器跨域访问问题

配置 `config\elasticsearch.yml`
```yml
http.cors.enabled: true
http.cors.allow-origin: "*"
```
- es 服务起不来

报错信息在 `logs` 文件夹下