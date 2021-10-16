(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{323:function(o,t,e){"use strict";e.r(t);var _=e(4),w=Object(_.a)({},(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[e("h1",{attrs:{id:"使用-mount-命令同步目录"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用-mount-命令同步目录"}},[o._v("#")]),o._v(" 使用 mount 命令同步目录")]),o._v(" "),e("p",[o._v("同步目录：")]),o._v(" "),e("p",[o._v("本地 mount [baseDir] 源目录 [targetDir] 目标目录")]),o._v(" "),e("blockquote",[e("p",[o._v("mount --bind [baseDir] [targetDir]")])]),o._v(" "),e("p",[o._v("跨主机 mount 需要 nfs 软件")]),o._v(" "),e("p",[o._v("1、将工作平台的plat_files挂载到接入层的plat_files文件夹")]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_plat/WebRoot/plat_files /srv/www/app/webroot/cczq_weixin_web/WebRoot/plat_files")])]),o._v(" "),e("p",[o._v("2、将工作平台的plat_files挂载到timer的plat_files文件夹")]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_plat/WebRoot/plat_files /srv/www/app/webroot/cczq_weixin_timer/plat_files")])]),o._v(" "),e("p",[o._v("3、将接入层的upload挂载到工作平台的upload")]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_web/WebRoot/upload /srv/www/app/webroot/cczq_weixin_plat/WebRoot/upload")])]),o._v(" "),e("blockquote",[e("p",[o._v("mount bind /srv/www /srv/www/")])]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_web/logs /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs")])]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_plat/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_plat")])]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_bus/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_bus")])]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_timer/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_timer")])]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 10.100.101.217:/srv/www/app/webroot/cczq_weixin_msgpush/log /srv/www/app/webroot/cczq_weixin_web/WebRoot/sharelogs_msg")])]),o._v(" "),e("p",[o._v("1、检查服务器是否安装nfs服务")]),o._v(" "),e("blockquote",[e("p",[o._v("rpm -q nfs-utils")])]),o._v(" "),e("p",[o._v("2、如果没有安装的话执行")]),o._v(" "),e("blockquote",[e("p",[o._v("yum install nfs-utils -y")])]),o._v(" "),e("p",[o._v("3、启动rpcbind")]),o._v(" "),e("blockquote",[e("p",[o._v("/etc/init.d/rpcbind start")])]),o._v(" "),e("p",[o._v("4、启动nfs")]),o._v(" "),e("blockquote",[e("p",[o._v("/etc/init.d/nfs start")])]),o._v(" "),e("p",[o._v("1、在服务端编辑 /etc/exports加入客户端访问权限 /nfsdir 192.168.163.131(rw,no_root_squash) 备注：/nfsdir为你要设置的nfs共享的目录")]),o._v(" "),e("p",[o._v("2、重启nfs")]),o._v(" "),e("blockquote",[e("p",[o._v("service nfs restart")])]),o._v(" "),e("p",[o._v("3、客户端操作：")]),o._v(" "),e("blockquote",[e("p",[o._v("mount -t nfs 192.168.163.128:/nfsdir /nfsdir")])]),o._v(" "),e("p",[o._v("4、执行第三步长时间没反应的话请关闭服务端的防火墙。")]),o._v(" "),e("p",[o._v("5、验证，在服务端的/nfsdir创建文件，看客户端是否能读取。")])])}),[],!1,null,null,null);t.default=w.exports}}]);