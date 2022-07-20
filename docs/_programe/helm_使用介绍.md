---
date: 2022-04-10 18:58
author: xiaop1ng
location: ShenZhen
title: Helm 使用介绍
summary: Helm 是查找、分享和使用软件构建 Kubernetes 的最优方式
tags:
  - kubernetes
---

# helm 使用介绍

## 安装

curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

## 使用

以下为官方示例:

```sh
# 初始化添加仓库
helm repo add bitnami https://charts.bitnami.com/bitnami
# 安装 wordpress 最简单的使用方法只需要传入两个参数：你命名的release名字和你想安装的chart的名称。
helm install happy-panda bitnami/wordpress
```

获取 wordpress 的 service 映射到宿主机的端口
> kubectl get service happy-panda-wordpress

```
NAME                    TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
happy-panda-wordpress   LoadBalancer   10.43.105.21   <pending>     80:30460/TCP,443:30977/TCP   14m
```
直接访问 `CLUSTER-IP`，只能在k8s集群内部访问
> curl 10.43.105.21

外部访问可以使用宿主机 IP:30460 访问，管理界面使用宿主机 IP:30460/admin 访问
Username: user
Password: `kubectl get secret --namespace default happy-panda-wordpress -o jsonpath="{.data.wordpress-password}" | base64 -d`

```sh
# 查看已安装的 helm 软件
helm list -n default
# 查看 release 的状态
helm status happy-panda
# 卸载 release
helm uninstall happy-panda
```

## 开发自己的 chart

可参考 demo [SpringBoot应用 helm 来管理 demo](https://github.com/xiaop1ng/hello-helm)

1. 初始化一个 SpringBoot 应用
2. 编写 Dockerfile
3. 将 java 应用打包成 docker 镜像
4. 编写 chart 描述文件
5. 打 helm chart 安装包
6. 安装到 k8s 环境中

demo 里面只写了一个接口，访问 `/` 返回 `is invoke`
```java
@SpringBootApplication
@RestController
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @GetMapping("/")
    public String root() {
        return "is invoke";
    }

}
```
`maven` 打包
> mvn clean package

接着编写 Dockerfile
```dockerfile
# 基础镜像
FROM openjdk:11.0.9-jre

# 复制jar包到容器
COPY target/hello-helm.jar app.jar

# 启用jvm容器支持
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=80.0 -XX:InitialRAMPercentage=75.0"

# 容器启动命令
ENTRYPOINT java ${JAVA_OPTS} -Dspring.profiles.active=prod -jar app.jar
```

打 docker 镜像包
> docker build -t hello-helm .

编写 chart 描述模板
**/templates/deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Values.deployment.name }}
  labels:
    app: {{ .Values.deployment.name }}
spec:
  replicas: {{ .Values.deployment.replicas }} # 副本数量
  selector:
    matchLabels:
      app: {{ .Values.deployment.name }}
  template:
    metadata:
      labels:
        app: {{ .Values.deployment.name }}
    spec:
      tolerations:
        - key: "node.kubernetes.io/not-ready"
          operator: "Exists"
          effect: "NoExecute"
          tolerationSeconds: 10
        - key: "node.kubernetes.io/unreachable"
          operator: "Exists"
          effect: "NoExecute"
          tolerationSeconds: 10
      containers:
        - name: {{ .Values.deployment.name }}
          image: '{{ .Values.deployment.image }}:{{ .Values.deployment.imageTag }}' # 镜像版本
          imagePullPolicy: {{ .Values.deployment.imagePullPolicy }}
          ports:
            - containerPort: {{ .Values.service.targetPort }} # POD端口
          env:
            - name: POD_NAMESPACE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: POD_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
            - name: NODE_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.hostIP
          livenessProbe:
            tcpSocket:
              port: {{ .Values.service.targetPort }}
            initialDelaySeconds: 600
            periodSeconds: 60
          readinessProbe:
            tcpSocket:
              port: {{ .Values.service.targetPort }}
            initialDelaySeconds: 5
            periodSeconds: 5
          resources:
            limits:
              memory: 2500Mi
            requests:
              memory: 500Mi
```

**/templates/service.yaml**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{ .Values.service.name }} # 服务名
spec:
  type: {{ .Values.service.type }} # 服务类型（网络类型）
  selector:
    app: {{ .Values.deployment.name }}
  ports:
    - port: {{ .Values.service.port }} # Service服务的端口
      targetPort: {{ .Values.service.targetPort }} # POD的端口
```

**Chart.yaml**
```yaml
apiVersion: v2
appVersion: 1.0.0
name: hello-helm
description: hello-helm
type: application
version: 1.0.0
```

部署配置文件**values.yaml**
```yaml
deployment:
  name: hello-helm # 部署名
  image: hello-helm # 镜像版本
  imageTag: latest #镜像tag
  imagePullPolicy: IfNotPresent # 镜像拉取策略
  replicas: 2 # 副本数量
service:
  name: hello-helm # Service服务名
  ##
  # 服务类型（网络类型），可选值如下
  # LoadBalancer 负载均衡，集群外可访问
  # ClusterIP 仅限集群内部访问
  ##
  type: ClusterIP # Service网络类型
  port: 80 # Service服务端口
  targetPort: 8080 # POD端口
```

配置完毕后开始打 helm chart包

> helm package ./helm

打包完成后，到 k8s 环境上进行安装

先将 docker 镜像包导入（注：需要所有节点都导入，如果使用 docker 仓库则只需要将镜像上传至仓库）
> docker load -i hello-helm.tar

安装
> helm install hello-helm  hello-helm-1.0.0.tgz

验证
```
[root@k3s-node-1 ~]# kubectl get pod -A|grep hello-helm
default       hello-helm-54568bcfcb-klq7k                      1/1     Running     0          1m
default       hello-helm-54568bcfcb-mbv8s                      1/1     Running     0          1m
```

## Link

[helm官方文档](https://helm.sh/zh/docs/)
[artifacthub](https://artifacthub.io/)
[chart开发指南](https://helm.sh/zh/docs/topics/charts/)
