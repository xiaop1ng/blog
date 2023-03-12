---
date: 2020-05-08 14:06
author: xiaop1ng
location: ShenZhen
title: 使用 mount 命令同步目录
tags:
  - linux
---


同步目录：

本地 mount [baseDir] 源目录 [targetDir] 目标目录

> mount --bind [baseDir] [targetDir]

跨主机 mount 需要 nfs 软件

1、将工作平台的plat_files挂载到接入层的plat_files文件夹 
> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_plat/WebRoot/plat_files /srv/www/app/webroot/cczq_weixin_web/WebRoot/plat_files

2、将工作平台的plat_files挂载到timer的plat_files文件夹 
> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_plat/WebRoot/plat_files /srv/www/app/webroot/cczq_weixin_timer/plat_files

3、将接入层的upload挂载到工作平台的upload 
> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_web/WebRoot/upload /srv/www/app/webroot/cczq_weixin_plat/WebRoot/upload

> mount bind /srv/www /srv/www/

> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_web/logs /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs

> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_plat/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_plat

> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_bus/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_bus

> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_timer/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_timer

> mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_msgpush/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_msg

1、检查服务器是否安装nfs服务 
> rpm -q nfs-utils 

2、如果没有安装的话执行 
> yum install nfs-utils -y 

3、启动rpcbind 
> /etc/init.d/rpcbind start 

4、启动nfs 
> /etc/init.d/nfs start

1、在服务端编辑 /etc/exports加入客户端访问权限 /nfsdir 192.168.163.131(rw,no_root_squash) 备注：/nfsdir为你要设置的nfs共享的目录 

2、重启nfs 
> service nfs restart 

3、客户端操作： 
> mount -t nfs 192.168.163.128:/nfsdir /nfsdir 

4、执行第三步长时间没反应的话请关闭服务端的防火墙。 

5、验证，在服务端的/nfsdir创建文件，看客户端是否能读取。