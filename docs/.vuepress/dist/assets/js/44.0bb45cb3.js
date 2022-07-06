(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{319:function(s,a,n){"use strict";n.r(a);var e=n(4),t=Object(e.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"keepalived"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#keepalived"}},[s._v("#")]),s._v(" keepalived")]),s._v(" "),n("p",[s._v("Keepalived 是 Linux 集群管理中保证集群高可用的一个服务软件，其功能是用来防止单点故障。")]),s._v(" "),n("h2",{attrs:{id:"安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),n("p",[n("strong",[s._v("环境")])]),s._v(" "),n("p",[s._v("系统："),n("a",{attrs:{href:"http://isoredirect.centos.org/centos/7/isos/x86_64/",target:"_blank",rel:"noopener noreferrer"}},[s._v("centos7"),n("OutboundLink")],1)]),s._v(" "),n("blockquote",[n("p",[s._v("yum install keepalived")])]),s._v(" "),n("h2",{attrs:{id:"使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[s._v("#")]),s._v(" 使用")]),s._v(" "),n("p",[s._v("VIP 172.18.5.148\nMaster 172.18.5.144\nBackup 172.18.5.145")]),s._v(" "),n("div",{staticClass:"language-sh line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-sh"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改 5.144 keepalived 配置文件")]),s._v("\ncat"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("/etc/keepalived/keepalived.conf"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("EOF\nvrrp_instance VI_1 {\n    state BACKUP            # 所有节点都配置为backup，非抢占模式\n    interface ens192        # 绑定虚拟IP的网卡接口\n    virtual_router_id 147   # VRRP组名（最小值0，最大值255，避开这两个特殊的边界值），同集群所有节点需设置一样，以指明各个节点同属一VRRP组，不同集群需设置为不同\n    priority 100            # 优先级，同集群所有节点需设置不同！！推荐节点1设置为100，节点2设置为90，节点3设置为80\n    advert_int 1            # 组播信息发送间隔，所有节点需设置一样\n    nopreempt               # 不抢占，避免不必要的主备切换\n    authentication {        # 设置密码验证信息，所有节点需设置一样\n        auth_type PASS\n        auth_pass 123789\n    }\n    unicast_src_ip 172.18.5.144 # 设置本机内网IP地址\n    unicast_peer {\n        172.18.5.145    # 对端设备的 IP 地址\n    }\n    virtual_ipaddress { # 指定虚拟IP，所有节点需设置一样 \n        172.18.5.148    # 设置高可用虚拟 VIP    \n    }\n}\nEOF")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改 5.145 keepalived 配置文件")]),s._v("\ncat"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("/etc/keepalived/keepalived.conf"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<<")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("EOF\nvrrp_instance VI_1 {\n    state BACKUP            # 所有节点都配置为backup，非抢占模式\n    interface ens192        # 绑定虚拟IP的网卡接口\n    virtual_router_id 147   # VRRP组名（最小值0，最大值255，避开这两个特殊的边界值），同集群所有节点需设置一样，以指明各个节点同属一VRRP组，不同集群需设置为不同\n    priority 100            # 优先级，同集群所有节点需设置不同！！推荐节点1设置为100，节点2设置为90，节点3设置为80\n    advert_int 1            # 组播信息发送间隔，所有节点需设置一样\n    nopreempt               # 不抢占，避免不必要的主备切换\n    authentication {        # 设置密码验证信息，所有节点需设置一样\n        auth_type PASS\n        auth_pass 123789\n    }\n    unicast_src_ip 172.18.5.145 # 设置本机内网IP地址\n    unicast_peer {\n        172.18.5.144    # 对端设备的 IP 地址\n    }\n    virtual_ipaddress { # 指定虚拟IP，所有节点需设置一样 \n        172.18.5.148    # 设置高可用虚拟 VIP    \n    }\n}\nEOF")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动 keepalived 服务并设置为开机自启动")]),s._v("\nsystemctl start keepalived\nsystemctl "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" keepalived\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br"),n("span",{staticClass:"line-number"},[s._v("41")]),n("br"),n("span",{staticClass:"line-number"},[s._v("42")]),n("br"),n("span",{staticClass:"line-number"},[s._v("43")]),n("br"),n("span",{staticClass:"line-number"},[s._v("44")]),n("br"),n("span",{staticClass:"line-number"},[s._v("45")]),n("br"),n("span",{staticClass:"line-number"},[s._v("46")]),n("br"),n("span",{staticClass:"line-number"},[s._v("47")]),n("br"),n("span",{staticClass:"line-number"},[s._v("48")]),n("br"),n("span",{staticClass:"line-number"},[s._v("49")]),n("br")])]),n("h2",{attrs:{id:"工作原理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#工作原理"}},[s._v("#")]),s._v(" 工作原理")]),s._v(" "),n("p",[n("strong",[s._v("VRRP协议")]),s._v("：Virtual Route Redundancy Protocol虚拟路由冗余协议。是一种容错协议，保证当主机的下一跳路由出现故障时，由另一台路由器来代替出现故障的路由器进行工作，从而保持网络通信的连续性和可靠性。")]),s._v(" "),n("p",[n("strong",[s._v("虚拟路由器")]),s._v("：由一个 Master 路由器和多个 Backup 路由器组成。主机将虚拟路由器当作默认网关。")]),s._v(" "),n("p",[n("strong",[s._v("Master 路由器")]),s._v("：虚拟路由器中承担报文转发任务的路由器。")]),s._v(" "),n("p",[n("strong",[s._v("Backup 路由器")]),s._v("： Master 路由器出现故障时，能够代替 Master 路由器工作的路由器。")]),s._v(" "),n("p",[n("strong",[s._v("虚拟 IP 地址")]),s._v("：虚拟路由器的 IP 地址。一个虚拟路由器可以拥有一个或多个IP 地址。")]),s._v(" "),n("p",[n("strong",[s._v("抢占和非抢占模式")]),s._v("：")]),s._v(" "),n("ul",[n("li",[s._v("非抢占方式：如果 Backup 路由器工作在非抢占方式下，则只要 Master 路由器没有出现故障，Backup 路由器即使随后被配置了更高的优先级也不会成为Master 路由器。")]),s._v(" "),n("li",[s._v("抢占方式：如果 Backup 路由器工作在抢占方式下，当它收到 VRRP 报文后，会将自己的优先级与通告报文中的优先级进行比较。如果自己的优先级比当前的 Master 路由器的优先级高，就会主动抢占成为 Master 路由器；否则，将保持 Backup 状态。")])]),s._v(" "),n("h2",{attrs:{id:"验证"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#验证"}},[s._v("#")]),s._v(" 验证")]),s._v(" "),n("p",[s._v("通过重启 keepalived 进程、重启子机、关机等方式模拟主机故障，检测 VIP 是否能正常迁移。")]),s._v(" "),n("h2",{attrs:{id:"link"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#link"}},[s._v("#")]),s._v(" Link")]),s._v(" "),n("p",[n("a",{attrs:{href:"https://keepalived-doc.readthedocs.io/zh_CN/latest/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Keepalived用户指南"),n("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=t.exports}}]);