---
date: 2021-10-30 15:20
author: xiaop1ng
location: ShenZhen
title: 使用 Docker 制作盒装部落格
tags:
  - Docker
---

# 使用 Docker 制作盒装部落格

## 先玩起来

[Play with Docker](https://labs.play-with-docker.com/) 官方提供的 Playground，进去点击 Start，然后 +ADD NEW INSTANCE 即可开玩。

上来直接 `run`
> docker run -it --rm -p 4000:80 ccr.ccs.tencentyun.com/dockerpracticesig/docker_practice:vuepress

先不要关心指令参数是什么意思（后文会提到），直接访问~（在这里只需要点击上面 `OPEN PORT` 旁边提供的按钮 `4000` 即可访达）
> <IP>:4000

当执行 `docker run` 来创建容器时，Docker 在后台运行的标准操作包括：

1. 检查本地是否存在指定的镜像，不存在就从 registry 下载
2. 利用镜像创建并启动一个容器
3. 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
4. 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
5. 从地址池配置一个 ip 地址给容器
6. 执行用户指定的应用程序
7. 执行完毕后容器被终止

> docker run -it --rm -p 8080:8080 xiaop1ng/blog:v1

给你一把钥匙，执行上面这条指令即可直达我的部落格

## 基本概念

- 镜像

> 操作系统分为内核和用户空间。对于 Linux 而言，内核启动后，会挂载 root 文件系统为用户提供用户空间支持。而 Docker 镜像（Image）相当于一个 root 文件系统。
> 一个特殊的文件系统（使用 Union FS 技术），分层存储的架构，镜像不包含任何动态数据，其内容在构建之后也不会被改变。

- 容器

> 镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

> 容器存储层的生存周期和容器一样，容器消亡时，容器存储层也随之消亡。因此，任何保存于容器存储层的信息都会随容器删除而丢失。

> 容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用 数据卷（Volume）、或者 绑定宿主目录，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。


- 仓库

> 仓库是我们拉货（镜像）的位置，官方的仓库是 Docker Hub

## 镜像相关命令

### 搜索镜像
> docker search <KEYWORD>

### 获取镜像
> docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]

### 推送镜像到仓库
> docker push <镜像名称>

### 运行容器
> docker run 

如：
> docker run -it --rm ubuntu:18.04 bash

- `-it`：这是两个参数，一个是 -i：交互式操作，一个是 -t 终端。我们这里打算进入 bash 执行一些命令并查看返回结果，因此我们需要交互式终端。
- `--rm`：这个参数是说容器退出后随之将其删除。默认情况下，为了排障需求，退出的容器并不会立即删除，除非手动 docker rm。我们这里只是随便执行个命令，看看结果，不需要排障和保留结果，因此使用 --rm 可以避免浪费空间。
- `ubuntu:18.04`：这是指用 ubuntu:18.04 镜像为基础来启动容器。
- `bash`：放在镜像名后的是 命令，这里我们希望有个交互式 Shell，因此用的是 bash。

最后我们通过 `exit` 退出了这个容器。

### 列出镜像
> docker image ls

### 删除镜像
> docker image rm [选项] <镜像1> [<镜像2> ...]

其中，<镜像> 可以是 镜像短 ID、镜像长 ID、镜像名 或者 镜像摘要。

需要注意的是容器对镜像的依赖，如果存在用这个镜像启动的容器存在（即使容器没有运行）那么同样不可以删除这个镜像。容器是以镜像为基础，再加一层容器存储，组成多层存储结构去运行的。

### commit 制作黑箱镜像
> docker commit --author "jiancp" --message "edit index" ng nginx:v2

提交完成后使用 `docker image ls` 可以查看到 nginx:v2 这个镜像

## 容器相关命令

### **启动容器**
> docker run 

示例：
> docker run -t -i ubuntu:18.04 /bin/bash

其中 `-t` 选项让 Docker 分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， `-i` 则让容器的标准输入保持打开。
另外我们可以使用 `-d` 后台启动容器

### **启动已终止的容器**
可以利用 `docker container start` 命令，直接将一个已经终止（exited）的容器启动运行。
> docker container start <容器ID>

### **查看容器信息**
> docker container ls

### **查看容器日志信息**
> docker container logs <容器ID>

### **终止容器**
> docker container stop <容器ID>

### **重新启动容器**
> docker container restart <容器ID>

### **进入容器**
> docker attach

推荐使用
> docker exec

示例：
> docker exec -it 09c2c bash

### **导出导入容器**
- 导出

> docker export

示例：
> docker export 7691a814370e > ubuntu.tar

- 导入

> cat ubuntu.tar | docker import - test/ubuntu:v1.0

### **删除容器**

> docker container rm <容器ID>

### **清理所有处于终止状态的容器**

> docker container prune

## 数据卷管理命令

- 数据卷

`数据卷` 是一个可供一个或多个容器使用的特殊目录，可以提供很多特性

- 数据卷 可以在容器之间共享和重用
- 对 数据卷 的修改会立马生效
- 对 数据卷 的更新，不会影响镜像
- 数据卷 默认会一直存在，即使容器被删除

> 注意：数据卷 的使用，类似于 Linux 下对目录或文件进行 mount，镜像中的被指定为挂载点的目录中的文件会复制到数据卷中（仅数据卷为空时会复制）。

### **创建数据卷**
> docker volume create my-vol

### **查看所有数据卷**
> docker volume ls

### **查看指定数据卷的信息**
> docker volume inspect my-vol

### **挂载数据卷**
> docker run -d -p 80:80 --name web --mount source=my-vol,target=/usr/share/nginx/html nginx

在用 `docker run` 命令的时候，使用 `--mount` 标记来将 数据卷 挂载到容器里。在一次 `docker run` 中可以挂载多个 数据卷。

### **查看容器信息**
> docker inspect web

数据卷信息在 `Mounts` 节点中
```
"Mounts": [
            {
                "Type": "volume",
                "Name": "my-vol",
                "Source": "/var/lib/docker/volumes/my-vol/_data",
                "Destination": "/usr/share/nginx/html",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            }
        ],
```

### **删除数据卷**
> docker volume rm my-vol

被容器引用的数据卷无法被删除

### **清理无主的数据卷**
> docker volume prune

- 挂载主机目录

使用 `--mount` 标记可以指定挂载一个本地主机的目录到容器中去。
> docker run -d -p 80:80 --name web --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html nginx

## 网络管理命令

通过 `-p` 或者 `-P` 参数指定端口映射

使用 `-P` 时，Docker 会**随机**映射一个主机端口到内部容器端口，支持多端口映射，如：

> docker run -d -p 80:80 -p 443:443 nginx

### **新建网络**
> docker network create -d bridge my-net

### **查看网络**
> docker network ls

使用 `--network` 使用网络，使用相同的网络，容器之间就可以实现网络互通

> docker run -it --rm --name busybox1 --network my-net busybox sh

> docker run -it --rm --name busybox2 --network my-net busybox sh

我们启动这两个容器之后，我们用 `ping` 工具去测试，可以发现 `busybox1` 和 `busybox2` 两个容器就可以网络互通了。

>  如果在相同网络中继续接入新的容器，那么在新接入容器中是可以通过 `busybox1` 的容器名称来 `ping` 通的。这是因为新容器都注册到了指定的 `Docker DNS` 服务，所以相同网络中的容器可以解析其他容器的名称。


## Dockerfile

Dockerfile 是一个文本文件，其内包含了一条条的 指令(Instruction)，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

示例：
```
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

`FROM` 是指定基础镜像

> 除了选择现有镜像为基础镜像外，Docker 还存在一个特殊的镜像，名为 scratch。这个镜像是虚拟的概念，并不实际存在，它表示一个空白的镜像。

`RUN` 指令是用来执行命令行命令的，其用法有两种

- shell 格式 `RUN <命令>` 
- exec 格式 `RUN ["可执行文件", "参数1", "参数2"]`，这更像是函数调用中的格式。

需要注意的是每一个 `RUN` 行为都会新建立一层

> Union FS 是有最大层数限制的，比如 AUFS，曾经是最大不得超过 42 层，现在是不得超过 127 层。

> 在撰写 Dockerfile 的时候，要经常提醒自己，这并不是在写 Shell 脚本，而是在定义每一层该如何构建。

创建好 Dockerfile 之后我们可以使用 `docker build` 命令来构建镜像

使用方法
> docker build [选项] <上下文路径/URL/->

在 Dockerfile 文件所在目录执行：
> docker build -t nginx:v3 .

运行结果：
```
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM nginx
 ---> f8f4ffc8092c
Step 2/2 : RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
 ---> Running in 5ae980ceac7b
Removing intermediate container 5ae980ceac7b
 ---> 571730ede8fe
Successfully built 571730ede8fe
Successfully tagged nginx:v3
```

`COPY` 指令
> COPY [--chown=<user>:<group>] <源路径>... <目标路径>

`COPY` 将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置。示例：
> COPY package.json /usr/src/app/

`ADD` 指令和 `COPY` 指令基本一致。如果 <源路径> 为一个 tar 压缩文件的话，压缩格式为 gzip, bzip2 以及 xz 的情况下，ADD 指令将会自动解压缩这个压缩文件到 <目标路径> 去。

```
FROM scratch
ADD ubuntu-xenial-core-cloudimg-amd64-root.tar.gz /
...
```

> 对于容器而言，其启动程序就是容器应用进程，容器就是为了主进程而存在的，主进程退出，容器就失去了存在的意义，从而退出，其它辅助进程不是它需要关心的东西。

`CMD` 指令和 `RUN` 指令格式相似
- shell 格式：CMD <命令>
- exec 格式：CMD ["可执行文件", "参数1", "参数2"...]
- 参数列表格式：CMD ["参数1", "参数2"...]。在指定了 ENTRYPOINT 指令后，用 CMD 指定具体的参数。

示例：
> CMD ["nginx", "-g", "daemon off;"]

`ENV` 指令设置环境变量
- ENV <key> <value>
- ENV <key1>=<value1> <key2>=<value2>...

示例：
```
ENV VERSION=1.0 DEBUG=on \
    NAME="Happy Feet"
```
这里我们定义了 `VERSION` `DEBUG` `NAME` 这些环境变量，后面的指令当中我们可以用 `$VERSION` `$DEBUG` `$NAME` 来使用前面定义的环境变量


`ARG` 指令构建参数

> ARG <参数名>[=<默认值>]

`ARG` 指令有生效范围，只作用于下一个阶段

```
# 只在 FROM 中生效
ARG DOCKER_USERNAME=library

FROM ${DOCKER_USERNAME}/alpine

# 要想在 FROM 之后使用，必须再次指定
ARG DOCKER_USERNAME=library

RUN set -x ; echo ${DOCKER_USERNAME}
```

`VOLUME` 指令定义匿名卷
> VOLUME <路径>

示例：
> VOLUME /data

`EXPOSE` 声明端口
> EXPOSE <端口1> [<端口2>...]

`WORKDIR` 指定工作目录
> WORKDIR <工作目录路径>

使用 `WORKDIR` 切换工作目录
```
WORKDIR /a
WORKDIR b
WORKDIR c

RUN pwd
```
RUN pwd 的工作目录为 /a/b/c

`USER` 指定当前用户
> USER <用户名>[:<用户组>]

`HEALTHCHECK` 健康检查

`LABEL` 指令给镜像添加一些元数据
> LABEL <key>=<value> <key>=<value> <key>=<value> ...

示例：
> LABEL org.opencontainers.image.authors="xiaoping"

`SHELL` 指令指定 `RUN` `ENTRYPOINT` `CMD` 指令的 shell，Linux 中默认为 `["/bin/sh", "-c"]`

`ONBUILD` 指令
> ONBUILD <其它指令>

> ONBUILD 是一个特殊的指令，它后面跟的是其它指令，比如 RUN, COPY 等，而这些指令，在当前镜像构建时并不会被执行。只有当以当前镜像为基础镜像，去构建下一级镜像的时候才会被执行。

### 多阶段构建

Dockerfile 如下：
```
FROM node:latest AS storefront
WORKDIR /usr/src/atsea/app/react-app
COPY react-app .
RUN npm install
RUN npm run build

FROM maven:latest AS appserver
WORKDIR /usr/src/atsea
COPY pom.xml .
RUN mvn -B -f pom.xml -s /usr/share/maven/ref/settings-docker.xml dependency
:resolve
COPY . .
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package -DskipTests

FROM java:8-jdk-alpine AS production
RUN adduser -Dh /home/gordon gordon
WORKDIR /static
COPY --from=storefront /usr/src/atsea/app/react-app/build/ .
WORKDIR /app
COPY --from=appserver /usr/src/atsea/target/AtSea-0.0.1-SNAPSHOT.jar .
ENTRYPOINT ["java", "-jar", "/app/AtSea-0.0.1-SNAPSHOT.jar"]
CMD ["--spring.profiles.active=postgres"]
```
Dockerfile中有3个FROM指令。每一个FROM指令构成一个单独的构建阶段。各个阶段在内部从0开始编号。不过，示例中针对每个阶段都定义了便于理解的名字。

阶段0叫作storefront；
阶段1叫作appserver；
阶段2叫作production。

- storefront阶段拉取了大小超过600MB的node:latest镜像，然后设置了工作目录，复制一些应用代码进去，然后使用2个RUN指令来执行npm操作。这会生成3个镜像层并显著增加镜像大小。指令执行结束后会得到一个比原镜像大得多的镜像，其中包含许多构建工具和少量应用程序代码。
- appserver阶段拉取了大小超过700MB的maven:latest镜像。然后通过2个COPY指令和2个RUN指令生成了4个镜像层。这个阶段同样会构建出一个非常大的包含许多构建工具和非常少量应用程序代码的镜像。
- production阶段拉取java:8-jdk-alpine镜像，这个镜像大约150MB，明显小于前两个构建阶段用到的node和maven镜像。这个阶段会创建一个用户，设置工作目录，从storefront阶段生成的镜像中复制一些应用代码过来。之后，设置一个不同的工作目录，然后从appserver阶段生成的镜像中复制应用相关的代码。最后，production设置当前应用程序为容器启动时的主程序。
重点在于COPY --from指令，它从之前的阶段构建的镜像中仅复制生产环境相关的应用代码，而不会复制生产环境不需要的构件。
还有一点也很重要，多阶段构建这种方式仅用到了一个Dockerfile，并且docker image build命令不需要增加额外参数。


## Docker manifest

为了支持多种系统架构的 Docker 镜像

>  Manifest列表是可选的——在没有Manifest列表的情况下，镜像仓库服务会返回普通的Manifest。

## Docker Compose

> 部署和管理繁多的服务是困难的。而这正是Docker Compose要解决的问题。

这里就不贴 `docker-compose.yml` 文件了，我们还是直接玩一下

获取 `docker-compose.yml` 文件
> git clone https://github.com/docker/awesome-compose.git

切换目录到 `wordpress-mysql`
> cd awesome-compose/wordpress-mysql

启动工程， `-d` 后台启动
> docker-compose up -d

这时候我们这个应用就启动起来了，我们再回过头来观察一下 `docker-compose.yml` 文件，`services` 定义了工程的服务，`volumes` 定义了数据卷

列出 docker-compose 应用
> docker-compose ps

关闭工程
> docker-compose stop

## 其他

### 拷贝容器中的文件

用于容器与主机之间的数据拷贝

> docker cp 

示例：
> docker cp  96f7f14e99ab:/www /tmp/

### 查看启动的容器占的端口

> docker container inspect <容器ID> | grep tcp
 
 
 
## 参考资料
- [《Docker从入门到实践》](https://vuepress.mirror.docker-practice.com/)
- [《深入浅出Docker》](https://book.douban.com/subject/30486354/)
