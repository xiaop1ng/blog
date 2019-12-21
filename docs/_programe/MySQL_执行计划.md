---
date: 2019-10-08 11:28
author: xiaop1ng
location: ShenZhen
title: MySQL 执行计划
summary: 在业务系统里面，给经常被搜索的字段加上索引是非常有必要的事情，然而，有时候我们明明建立了索引，但是查询依旧缓慢。这个时候我们就需要使用执行计划了，查询执行计划来查看数据库查询时是否走了索引
tags:
  - database
---

# MySQL 执行计划

> 注：MySQL 版本 -> `5.7.27`

```sql
SELECT VERSION() `version`, NOW() `now`;

+------------+---------------------+
| version    | now                 |
+------------+---------------------+
| 5.7.27-log | 2019-09-30 14:48:36 |
+------------+---------------------+
```

[MySQL 5.7.27 官网下载](https://dev.mysql.com/downloads/windows/installer/5.7.html)

## 目录

- [创建实验数据](#创建实验数据)
- [索引](#索引)
- [执行计划](#执行计划)

## 创建实验数据

一个**玩耍的库**，所以他的有一定数据量，且有一定代表意义。
所以我们准备创建用户模块的表，这个表拥有 100w 条用户数据。

> 注：请不要拿生产库做该实验

```sql
-- 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_sn` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 用户密码表
DROP TABLE IF EXISTS `user_pass`;
CREATE TABLE `user_pass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_sn` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

创建 100w 条数据

```sql
-- 创建一个存储过程，用于循环创建数据
create procedure create_data(a int) 
	begin
        declare i int default 1;
	while i<=a DO -- 循环开始
        insert into `user` value( i, REPLACE( UUID(), '-', '') , i, floor(1+rand()*2), i, now() );
        insert into user_pass value (i, i, md5(i));
        set i=i+1;
	end while; -- 循环结束
	end;

-- 执行存储过程，这里的 1000000 为入参
call create_data(1000000);
-- 删除存储过程
drop procedure if exists create_data;
```

时间: 2432.784s，大约要花 40 多分钟，等不了那么久的同学也可以创建 10w 条数据先耍着。


## 索引

相信细心的小伙伴已经发现了，两个表里面除了主键外均是没有建立索引的。而依据具体的业务我们很容易能发现在 `user_sn` 用户编号上
适合建立唯一索引。如果用户名 `user_name` 和手机号 `phone` 经常会被用于查询用户信息，那么在其字段上建议索引也是合理的。

### 索引的创建与删除

**创建索引**

> CREATE INDEX indexName ON mytable(username(length)); 

> ALTER table tableName ADD INDEX indexName(columnName);

**删除索引**

> DROP INDEX [indexName] ON mytable; 

**唯一索引**
> CREATE UNIQUE INDEX indexName ON mytable(username(length));

> ALTER table tableName ADD UNIQUE [indexName] (username(length));

**显示索引**

> SHOW INDEX FROM tableName;

### 查询用户基本信息

首先为了每次查询都是公平的，我们禁用掉数据库缓存（万万不可拿生产的数据库做此实验）

```sql
set global query_cache_size=0;
set global query_cache_type=0;
```

业务系统中不宜将自增的 `id` 暴露出去，所以这里选择使用 `user_sn` 来查询对应的用户信息。 

> select * from `user` where user_sn = '826104d6e34b11e9be1768f72847b82b'; -- 1.369s

可以明显的看到这个查询耗时太久了，我们知道 `user_sn` 是非空且唯一的 uuid，所以这里我们加上唯一索引。

> CREATE UNIQUE INDEX unique_key_user_user_sn ON user(user_sn(32)); -- 5.660s

建立好唯一索引之后再来查询一次

> select * from `user` where user_sn = '826104d6e34b11e9be1768f72847b82b'; -- 0.004s

建立了唯一索引之后查询效率提升了 342 倍，这里是基于 100 万数据的查询结果。显而易见的是在加了索引之后的查询不会搜全表，而不加索引的查询会搜全表。


最后试试把唯一索引换成普通的 Btree 索引的查询效率

```sql
DROP INDEX unique_key_user_user_sn ON user;
CREATE INDEX key_user_user_sn ON user( user_sn(32) );  -- 5.671s
```

> select * from `user` where user_sn = '826104d6e34b11e9be1768f72847b82b'; -- 0.003s

我们这里看到的结果是建立普通索引和唯一索引之后的查询效率是差不多的。


## 执行计划

上面介绍了索引，从结果上看，一个查询走索引和不走索引的查询效率的差别，当然这个也很好理解。

生活中的例子有：我们通过各种字典去查单词、生字、成语之类的；在图书馆里每一本书会有一个索引号（A-Z 开头），
同时对图书进行分类，把不同分类的书籍摆放到不同的楼层和区域；在奶茶门店里店员会将顾客下单的饮品按订单的取茶号（1-9 开头）
放置在一个取茶的标识架（标识 1-9）里面。

所以在业务系统里面，给经常被搜索的字段加上索引是非常有必要的事情，然而，有时候我们明明建立了索引，但是查询依旧缓慢。这个
时候我们就需要使用执行计划了，查询执行计划来查看数据库查询时是否走了索引。

### 使用 explain 查看 mysql 执行计划

`explain` 适用于 `select`, `insert`, `update` 和 `delete` 语句

```sql
explain select * from `user` where user_sn = '826104d6e34b11e9be1768f72847b82b';

+----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+-------+------+----------+-------+
| id | select_type | table | partitions | type  | possible_keys           | key                     | key_len | ref   | rows | filtered | Extra |
+----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | user  | NULL       | const | unique_key_user_user_sn | unique_key_user_user_sn | 99      | const |    1 |      100 | NULL  |
+----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+-------+------+----------+-------+
```

- id 查询序列号
- select_type 查询类型
- table 输出所引用的表
- partitions 匹配的分区
- type 连接使用的类型

> 结果值从好到坏依次是：
system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL > UNKNOWN
也就是说 type 记录了是否使用了索引还是全表扫描，const, eg_reg, ref, range, index, ALL
一般来说，得保证查询至少达到 range 级别，最好能达到 ref，否则就可能会出现性能问题。

- possible_keys 指出使用到那些索引有助于查询
- key 实际选择的索引
- key_len 使用索引的长度。在不损失精确性的情况下，长度越短越好
- ref 显示索引的那一列被使用了
- rows 请求数据的行数
- filtered 按表条件过滤行的百分比
- Extra 附件信息

> 特别的 explain 不会考虑 cache；不能显示 mysql 在执行查询时所作的优化工作；部分统计信息是估算的。

我们删掉 `user_sn` 上所有的索引，然后查看一下执行计划

```sql
explain select * from `user` where user_sn = '826104d6e34b11e9be1768f72847b82b';

+----+-------------+-------+------------+------+---------------+------+---------+------+--------+----------+-------------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows   | filtered | Extra       |
+----+-------------+-------+------------+------+---------------+------+---------+------+--------+----------+-------------+
|  1 | SIMPLE      | user  | NULL       | ALL  | NULL          | NULL | NULL    | NULL | 994143 |       10 | Using where |
+----+-------------+-------+------------+------+---------------+------+---------+------+--------+----------+-------------+
```

我们可以看到没有索引的时候 type 为 ALL，也就是全表扫描。 key 是 NULL，也就是说这个查询没有使用到任何索引。

删掉 `user_sn` 上所有的索引然后在 `user_sn` 建立唯一索引，再查看执行计划：

```sql
explain select * from `user` where user_sn = '826104d6e34b11e9be1768f72847b82b';

+----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+-------+------+----------+-------+
| id | select_type | table | partitions | type  | possible_keys           | key                     | key_len | ref   | rows | filtered | Extra |
+----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | user  | NULL       | const | unique_key_user_user_sn | unique_key_user_user_sn | 99      | const |    1 |      100 | NULL  |
+----+-------------+-------+------------+-------+-------------------------+-------------------------+---------+-------+------+----------+-------+
```

加了唯一索引之后，type 为 const，key 为 unique_key_user_user_sn 表明这个查询使用到了该索引。


删掉 `user_sn` 上所有的索引然后在 `user_sn` 建立索引，再查看执行计划：

```sql
explain select * from `user` where user_sn = '826104d6e34b11e9be1768f72847b82b';

+----+-------------+-------+------------+------+------------------+------------------+---------+-------+------+----------+-------+
| id | select_type | table | partitions | type | possible_keys    | key              | key_len | ref   | rows | filtered | Extra |
+----+-------------+-------+------------+------+------------------+------------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | user  | NULL       | ref  | key_user_user_sn | key_user_user_sn | 99      | const |    1 |      100 | NULL  |
+----+-------------+-------+------------+------+------------------+------------------+---------+-------+------+----------+-------+
```

加了索引之后，type 为 ref 为 key_user_user_sn 表明这个查询使用到了该索引。

