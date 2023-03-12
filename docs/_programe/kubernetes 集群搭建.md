---
date: 2021-12-04 18:58
author: xiaop1ng
location: ShenZhen
title: kubernetes 集群搭建
summary: k3s 一主两从模式部署
tags:
  - kubernetes
---

**环境**
系统：[centos7](http://isoredirect.centos.org/centos/7/isos/x86_64/)
软件：[k3s](https://k3s.io/) 
软件版本：[v1.21.7-rc2+k3s2](https://github.com/k3s-io/k3s/releases/tag/v1.21.7-rc2%2Bk3s2)
部署模式：1个主节点 2个工作节点

## 安装 docker

```sh
# 在所有节点安装 docker
# 安装 yum 工具包
yum -y install yum-utils
# 安装前置依赖
yum install -y https://mirrors.tuna.tsinghua.edu.cn/centos/7/extras/x86_64/Packages/slirp4netns-0.4.3-4.el7_8.x86_64.rpm yum install -y https://mirrors.tuna.tsinghua.edu.cn/centos/7/extras/x86_64/Packages/fuse-overlayfs-0.7.2-6.el7_8.x86_64.rpm
# 设置yum源
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 安装docker服务
sed -i 's/$releasever/7/g' /etc/yum.repos.d/docker-ce.repo 
yum install docker-ce-rootless-extras -y 
yum install docker-ce docker-ce-cli containerd.io -y
systemctl enable docker
systemctl start docker
```

## 安装 k8s 之前的配置

```sh
# 在所有节点上执行
# 关闭swap
sudo swapoff -a
# 关闭防火墙
sudo systemctl stop firewalld && sudo systemctl disable firewalld
# 设置SELinux 模式为宽容模式
sudo setenforce 0 sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
# 配置 iptables 参数
sudo cat > /etc/modules-load.d/k8s.conf <<'EOF'
br_netfilter
EOF
sudo cat > /etc/sysctl.d/k8s.conf <<'EOF'
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
# 安装下载工具
yum -y install wget
# 安装依赖
yum install -y https://rpm.rancher.io/k3s/stable/common/centos/7/noarch/k3s-selinux-0.4-1.el7.noarch.rpm
```

## 安装k3s

```sh
# 在所有节点上执行，根据实际情况替换ip
# 修改hosts
echo "# k3s节点" >> /etc/hosts
echo "192.168.7.100 k3s-node-1" >> /etc/hosts
echo "192.168.7.101 k3s-node-2" >> /etc/hosts
echo "192.168.7.102 k3s-node-3" >> /etc/hosts
```

1. 主节点安装启动

```sh
# 在主节点上执行
# 创建安装目录
mkdir -p /var/lib/rancher/k3s/agent/images/
mkdir -p /opt/k3s_package/ && cd /opt/k3s_package/
wget https://github.com/k3s-io/k3s/releases/download/v1.21.7-rc2%2Bk3s2/k3s-airgap-images-amd64.tar
wget https://github.com/k3s-io/k3s/releases/download/v1.21.7-rc2%2Bk3s2/k3s

cp /opt/k3s_package/k3s-airgap-images-amd64.tar /var/lib/rancher/k3s/agent/images/ 
cp /opt/k3s_package/k3s /usr/local/bin/k3s
chmod +x /usr/local/bin/k3s
k3s -v

export INSTALL_K3S_SKIP_DOWNLOAD=true 
export K3S_URL= 
export K3S_TOKEN= 
export INSTALL_K3S_EXEC="--disable servicelb --disable traefik --https-listen-port 10443 --docker"
# 下载执行脚本，无反应的情况可以手动下载下来放到服务器上
curl -sfL https://get.k3s.io > /opt/k3s_package/install_k3s.sh
# 以主节点运行k3s
sh /opt/k3s_package/install_k3s.sh
```

查看主节点 token
> [root@k3s-node-1 k3s_package]# cat /var/lib/rancher/k3s/server/token
K10117300ae8995cd3a7cabc0ccb52576442f5fa8d2f369ee8ad62c70f3ba6897fb::server:a76c4542cf3ca0919ae74ea5cdef323d

将 token 赋值到从节点的 K3S_TOKEN

2. 从节点安装启动
```sh
# 在从节点上执行
# 创建安装目录
mkdir -p /var/lib/rancher/k3s/agent/images/
mkdir -p /opt/k3s_package/ && cd /opt/k3s_package/
wget https://github.com/k3s-io/k3s/releases/download/v1.21.7-rc2%2Bk3s2/k3s-airgap-images-amd64.tar
wget https://github.com/k3s-io/k3s/releases/download/v1.21.7-rc2%2Bk3s2/k3s

cp /opt/k3s_package/k3s-airgap-images-amd64.tar /var/lib/rancher/k3s/agent/images/ 
cp /opt/k3s_package/k3s /usr/local/bin/k3s
chmod +x /usr/local/bin/k3s
k3s -v

# 下载执行脚本，无反应的情况可以手动下载下来放到服务器上
curl -sfL https://get.k3s.io > /opt/k3s_package/install_k3s.sh
# 以工作节点运行k3s
cat /opt/k3s_package/install_k3s.sh | INSTALL_K3S_SKIP_DOWNLOAD=true K3S_URL=https://k3s-node-1:10443 K3S_TOKEN=K10117300ae8995cd3a7cabc0ccb52576442f5fa8d2f369ee8ad62c70f3ba6897fb::server:a76c4542cf3ca0919ae74ea5cdef323d sh -
```

3. 查看 k3s 状态
```
# 主节点 k3s 状态
systemctl status k3s
# 从节点 k3s 状态
systemctl status k3s-agent
# 查看所有节点信息
kubectl get nodes

NAME         STATUS   ROLES                  AGE    VERSION
k3s-node-1   Ready    control-plane,master   36m    v1.21.7-rc2+k3s2
k3s-node-3   Ready    <none>                 116s   v1.21.7-rc2+k3s2
k3s-node-2   Ready    <none>                 119s   v1.21.7-rc2+k3s2
```

## Link

- [k8s中文文档](https://kubernetes.io/zh-cn/docs/home/)
- [k3s中文文档](https://docs.rancher.cn/docs/k3s/_index)
- [lens工具](https://k8slens.dev/)：可视化的k8s管理工具
- [playWithK8s](https://labs.play-with-k8s.com/)：在线k8s实验环境
