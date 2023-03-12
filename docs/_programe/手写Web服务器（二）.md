---
date: 2023-02-24 14:26
author: xiaop1ng
location: ShenZhen
title: 手写 Web 服务器（二）
tags:
  - Java
---

## 书接上回

[动手写一个 Web 服务器](https://xiaop1ng.github.io/2018/03/24/%E5%8A%A8%E6%89%8B%E5%86%99%E4%B8%80%E4%B8%AA-web-%E6%9C%8D%E5%8A%A1%E5%99%A8/)的大致思路是使用  `ServerSocket`  对象的  `accept`  方法等待请求进来，有请求进来的时候该方法会返回一个  `Socket`  对象。我们使用  `Socket`  对象的输入输出流来构建请求和响应对象，从而达到响应外部请求的目的。而`ServerSocket`是基于 BIO 实现的，也就是同步阻塞，由于所有的请求都是串行的，会存在一个问题就是处理并发能力较差。为了解决该问题，我们今天使用非阻塞的 NIO 来实现 Server 部分，使用设置为非阻塞的 `ServerSocketChannel` 绑定到监听的端口上，请求流由 selector 来调度到对应的 channel 处理，同时 channel 也负责响应。
 
## 代码清单

 
```
-- src  程序源
    +- server   CORE
        -- App.java     程序入口
        -- Server.java  webServer服务接口
        -- SockerServer.java webServer服务基于BIO的实现
        -- NIOServer.java webServer服务基于NIO的实现，当前服务选择
        -- Request.java 请求对象
        -- Response.java    响应对象
    +- util         工具包 
        -- Log.java     日志打印

-- lib  引用第三方库
    -- gson-2.8.0.jar   JSON解析库

-- public 静态文件目录    
```
 
## 关键代码

 
### NIOServer.java 服务主程序

 
```java
    @Override
    public void listen() {
        Log.m("WebServer Start,Listen PORT: " + this.port);
        Log.m("WebServer webroot: " + WEB_ROOT);
        try {
            serverSocketChannel = ServerSocketChannel.open();
            //绑定端口
            serverSocketChannel.socket().bind(new InetSocketAddress(port));
            //设置为非阻塞
            serverSocketChannel.configureBlocking(false);
            //得到Selector对象
            Selector selector = Selector.open();
            //把ServerSocketChannel注册到selector，并说明让Selector关注的点，这里是关注建立连接这个事件
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

            while (true) {
                try {
                    selector.select();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                // 获取到 selector 里所有就绪的SelectedKey实例，每将一个channel注册到一个selector就会产生一个selectedKey
                Set<SelectionKey> readyKeys = selector.selectedKeys();
                Iterator<SelectionKey> iterator = readyKeys.iterator();
                while (iterator.hasNext()) {
                    //获得到一个事件
                    SelectionKey key = iterator.next();
                    iterator.remove();
                    try {
                        if (!key.isValid()) {
                            continue;
                        }
                        handler(key);
                    } catch (Exception e) {
                        Log.m("发生错误：" + e.getMessage());
                        continue;
                    }

                }
            }

        } catch (UnknownHostException e) {
            e.printStackTrace();
            System.exit(1);
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void handler(SelectionKey key) {
        try {
            // SelectedKey 处于Acceptable状态
            if (key.isAcceptable()) {
                ServerSocketChannel server = (ServerSocketChannel)key.channel();
                // 接受客户端的连接
                SocketChannel client = server.accept();
                if (client == null) {
                    Log.i("No connection is available. Skipping selection key");
                    return;
                }
                // 设置非阻塞模式
                client.configureBlocking(false);
                // 向selector注册socketchannel，主要关注读写，并传入一个ByteBuffer实例供读写缓存
                client.register(key.selector(), SelectionKey.OP_READ, ByteBuffer.allocate(1024));
            }
            // SelectedKey 处于可读的状态
            else if (key.isReadable()) {
                // SocketChannel 是一个连接到 TCP 网络套接字的通道
                SocketChannel client = (SocketChannel) key.channel();
                // 从 SocketChannel读取到的数据将会放到这个 buffer 中
                ByteBuffer output = (ByteBuffer) key.attachment();

                if(output == null) {
                    key.attach(output);
                    return;
                }
                // 循环将通道数据读入缓冲区
                while(client.read(output)>0){

                }
                output.flip();
                // 切换到写模式
                key.interestOps(SelectionKey.OP_WRITE);
            }
            // SelectedKey 处于可写的状态
            else if (key.isWritable()) {
                // SocketChannel 是一个连接到 TCP 网络套接字的通道
                SocketChannel client = (SocketChannel) key.channel();
                // 从 SocketChannel读取到的数据将会放到这个 buffer 中
                ByteBuffer output = (ByteBuffer) key.attachment();

                String request = StandardCharsets.UTF_8.decode(output).toString();
                output.flip();
                Log.m(request);
                if (null == request || "".equals(request)){
                    throw new NullPointerException("req is null");
                }
                Request req = new Request(request);
                Response res = new Response(client);
                res.setRequest(req);
                // uri 匹配来匹配不一样的请求，交给不同 Action 来处理
                String uri = req.getUri();
                Log.m("uri:"  + uri);
                Method routerMethod = routerMap.get(uri);
                // 这里如果请求能和我们的路由匹配上，则不会返回静态资源
                if (null != routerMethod) { // 能匹配到相应的方法来处理该请求
                    routerMethod.invoke(ctxMap.get(uri).getDeclaredConstructor().newInstance(), req, res);
                } else { // 尝试返回静态资源
                    res.sendStaticResource();
                }
                // 将以编写的数据从缓存中移除
                output.compact();
            }
        } catch (Exception e) {
            key.cancel();
            try {
                key.channel().close();
            } catch (IOException ex) {
            }
        }
    }
```
 
 
## 效果预览

**页面请求**
![静态资源](https://i.loli.net/2019/12/20/d1KzWOqYUk5SAuC.png)

**api 请求**
![API请求](https://i.loli.net/2019/12/20/JuY5wCsgWKPbBAM.png)


 
## GitHub

[https://github.com/xiaop1ng/WebServer](https://github.com/xiaop1ng/WebServer)

 
## 参考书籍与开源框架

- 《图解HTTP》

- [Express](https://github.com/expressjs/express)
