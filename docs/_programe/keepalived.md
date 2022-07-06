---
date: 2022-02-12 16:10
author: xiaop1ng
location: ShenZhen
title: 使用 keepalived 实现高可用主备 
summary: Keepalived 是 Linux 集群管理中保证集群高可用的一个服务软件，其功能是用来防止单点故障。
tags:
  - 高可用
  - kubernetes
---

# 使用 keepalived 实现高可用主备

Keepalived 是 Linux 集群管理中保证集群高可用的一个服务软件，其功能是用来防止单点故障。


## 安装

**环境**

系统：[centos7](http://isoredirect.centos.org/centos/7/isos/x86_64/)

> yum install keepalived

## 使用

VIP 172.18.5.148
Master 172.18.5.144
Backup 172.18.5.145

```sh
# 修改 5.144 keepalived 配置文件
cat>/etc/keepalived/keepalived.conf<<EOF
vrrp_instance VI_1 {
    state BACKUP            # 所有节点都配置为backup，非抢占模式
    interface ens192        # 绑定虚拟IP的网卡接口
    virtual_router_id 147   # VRRP组名（最小值0，最大值255，避开这两个特殊的边界值），同集群所有节点需设置一样，以指明各个节点同属一VRRP组，不同集群需设置为不同
    priority 100            # 优先级，同集群所有节点需设置不同！！推荐节点1设置为100，节点2设置为90，节点3设置为80
    advert_int 1            # 组播信息发送间隔，所有节点需设置一样
    nopreempt               # 不抢占，避免不必要的主备切换
    authentication {        # 设置密码验证信息，所有节点需设置一样
        auth_type PASS
        auth_pass 123789
    }
    unicast_src_ip 172.18.5.144 # 设置本机内网IP地址
    unicast_peer {
        172.18.5.145    # 对端设备的 IP 地址
    }
    virtual_ipaddress { # 指定虚拟IP，所有节点需设置一样 
        172.18.5.148    # 设置高可用虚拟 VIP    
    }
}
EOF

# 修改 5.145 keepalived 配置文件
cat>/etc/keepalived/keepalived.conf<<EOF
vrrp_instance VI_1 {
    state BACKUP            # 所有节点都配置为backup，非抢占模式
    interface ens192        # 绑定虚拟IP的网卡接口
    virtual_router_id 147   # VRRP组名（最小值0，最大值255，避开这两个特殊的边界值），同集群所有节点需设置一样，以指明各个节点同属一VRRP组，不同集群需设置为不同
    priority 100            # 优先级，同集群所有节点需设置不同！！推荐节点1设置为100，节点2设置为90，节点3设置为80
    advert_int 1            # 组播信息发送间隔，所有节点需设置一样
    nopreempt               # 不抢占，避免不必要的主备切换
    authentication {        # 设置密码验证信息，所有节点需设置一样
        auth_type PASS
        auth_pass 123789
    }
    unicast_src_ip 172.18.5.145 # 设置本机内网IP地址
    unicast_peer {
        172.18.5.144    # 对端设备的 IP 地址
    }
    virtual_ipaddress { # 指定虚拟IP，所有节点需设置一样 
        172.18.5.148    # 设置高可用虚拟 VIP    
    }
}
EOF

# 启动 keepalived 服务并设置为开机自启动
systemctl start keepalived
systemctl enable keepalived
```

## 工作原理

**VRRP协议**：Virtual Route Redundancy Protocol虚拟路由冗余协议。是一种容错协议，保证当主机的下一跳路由出现故障时，由另一台路由器来代替出现故障的路由器进行工作，从而保持网络通信的连续性和可靠性。

**虚拟路由器**：由一个 Master 路由器和多个 Backup 路由器组成。主机将虚拟路由器当作默认网关。

**Master 路由器**：虚拟路由器中承担报文转发任务的路由器。

**Backup 路由器**： Master 路由器出现故障时，能够代替 Master 路由器工作的路由器。

**虚拟 IP 地址**：虚拟路由器的 IP 地址。一个虚拟路由器可以拥有一个或多个IP 地址。

**抢占和非抢占模式**：

- 非抢占方式：如果 Backup 路由器工作在非抢占方式下，则只要 Master 路由器没有出现故障，Backup 路由器即使随后被配置了更高的优先级也不会成为Master 路由器。
- 抢占方式：如果 Backup 路由器工作在抢占方式下，当它收到 VRRP 报文后，会将自己的优先级与通告报文中的优先级进行比较。如果自己的优先级比当前的 Master 路由器的优先级高，就会主动抢占成为 Master 路由器；否则，将保持 Backup 状态。

## 验证

通过重启 keepalived 进程、重启子机、关机等方式模拟主机故障，检测 VIP 是否能正常迁移。


## Link

[Keepalived用户指南](https://keepalived-doc.readthedocs.io/zh_CN/latest/)