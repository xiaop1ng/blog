---
date: 2018-03-24 01:20
author: xiaop1ng
location: ShenZhen
title: 使用 Java 动手写一个 Web 服务器
tags:
  - Java
---

# 使用 Java 动手写一个 Web 服务器

## 关于 web 服务器

Java 中有很多优秀的 web 服务器（容器），如 Tomcat、Weblogic、JBOSS 等等。我们都知道 web 服务器是用于接受外部请求并给予回应（响应）的一个玩意儿。所以今天造一个可以接受请求并响应请求的轮子，大致思路是使用  `ServerSocket`  对象的  `accept`  方法等待请求进来，有请求进来的时候该方法会返回一个  `Socket`  对象。我们使用  `Socket`  对象的输入输出流来构建请求和响应对象，从而达到响应外部请求的目的。

 
## 代码清单

 
```
-- src  程序源
    +- server   CORE
        -- App.java     程序入口
        -- Server.java  webServer服务的实现
        -- Request.java 请求对象
        -- Response.java    响应对象
    +- util         工具包 
        -- Log.java     日志打印

-- lib  引用第三方库
    -- gson-2.8.0.jar   JSON解析库

-- public 静态文件目录    
```
 
## 关键代码

 
### Server.java 服务主程序

 
```java
package com.xiaoping.server;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

import com.xiaoping.util.Log;

public class Server {
    // TODO: 这里的配置项应该写到配置文件里面去

    // 默认监听 80 端口
    private int port = 80;

    private String host = "0.0.0.0";

    private ServerSocket serverSocket = null;

    // 配置默认静态资源文件夹
    public static final String WEB_ROOT = System.getProperty("user.dir") + File.separator + "public";

    // 配置默认 index 页面
    public static final String WEB_INDEX = File.separator + "index.html";

    // 路由和 Method 的映射
    public static Map<String, Method> routerMap = new HashMap<String, Method>();

    // 路由和 Method 对应的类 (Context) 的映射
    public static Map<String, Class<?>> ctxMap = new HashMap<String, Class<?>>();

    private Server() {};

    private static Server webServer = null;

    public static Server getInstance() {
        return webServer==null?new Server():webServer;
    }

    public void listen() {
        Log.m("WebServer Start,Listen PORT: " + this.port);
        Log.m("WebServer webroot: " + WEB_ROOT);
        try {
            serverSocket = new ServerSocket(this.port, 1, InetAddress.getByName(this.host));
        } catch (UnknownHostException e) {
            e.printStackTrace();
            System.exit(1);
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }

        while(true) {
            Socket socket = null;
            InputStream is = null;
            OutputStream os = null;

            try {
                // 这里 serSocket 阻塞住，当有请求进来，会产生一个 socket 对象 
                socket = serverSocket.accept();
                is = socket.getInputStream();
                os = socket.getOutputStream();
                // 从 socket 中取出输入输出流，分别构建请求和响应对象
                Request req = new Request(is);
                Response res = new Response(os);
                res.setRequest(req);

                // uri 匹配来匹配不一样的请求，交给不同 Action 来处理
                String uri = req.getUri();
                Log.m(uri);
                Method routerMethod = routerMap.get(uri);
                // 这里如果请求能和我们的路由匹配上，则不会返回静态资源
                if(null != routerMethod) { // 能匹配到相应的方法来处理该请求
                        routerMethod.invoke(ctxMap.get(uri).getDeclaredConstructor().newInstance(), req, res);
                }else { // 尝试返回静态资源
                        res.sendStaticResource();
                }
                // TODO: 设置一个 Timeout 时长
                // 关闭 socket 对象
                socket.close();
            } catch (Exception e) {
                continue;
            }
        }
    }

    public void listen(int port) {
        this.port = port;
        this.listen();
    }


    /**
     * 启动 Server
     * @param port
     * @param host
     */
    public void listen(int port, String host) {
        this.port = port;
        this.host = host;
        this.listen();
    }

    /**
     * 添加路由匹配规则
     * @param path 路由匹配字符串
     * @param clazz 处理该路由的类
     * @param methodName 对应的方法名
     * @throws NoSuchMethodException
     * @throws SecurityException
     */
    public void use(String path, Class<?> clazz, String methodName) throws NoSuchMethodException, SecurityException {
        Method m = clazz.getMethod(methodName, Request.class, Response.class);
        routerMap.put(path, m);
        ctxMap.put(path, clazz);
    }

    /**
     * 关闭 Server
     */
    public void close() {
        if(serverSocket != null && serverSocket.isClosed() == false) {
            try {
                serverSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
 
### Request.java 封装请求对象

 
```java
package com.xiaoping.server;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import com.xiaoping.util.Log;

public class Request {

    private InputStream input;

    // 请求方法 GET|POST
    private String methon;

    // 请求 URI 不包含 host 如：127.0.0.1/index.html?p=2 => /index.html
    private String uri;

    // 请求 ? 后面的部分 如：127.0.0.1/index.html?p=2 => p=2
    private String searchString;

    // query 部分的 K-V
    private Map<String, String> queryMap;

    // POST 请求的表单
    private String bodyString;

    // body 部分的 K-V
    private Map<String, String> bodyMap;

    public Request(InputStream input) {
        this.input = input;

        StringBuffer request = new StringBuffer(2048);
        int i;
        byte[] buffer = new byte[2048];
        try {
            i = input.read(buffer);
        } catch (IOException e) {
            e.printStackTrace();
            i = -1;
        }
        for (int j = 0; j < i; j++) {
            request.append((char) buffer[j]);
        }
        // GET请求
        // GET /index.html?a=111222333&a=3333 HTTP/1.1
        // Host: 127.0.0.1:8080
        // Connection: keep-alive
        // Cache-Control: max-age=0
        // Upgrade-Insecure-Requests: 1
        // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)
        // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
        // Accept:
        // text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
        // DNT: 1
        // Accept-Encoding: gzip, deflate, br
        // Accept-Language: zh-CN,zh;q=0.9,en;q=0.8

        // POST请求
        // POST /index.html HTTP/1.1
        // Content-Type: application/x-www-form-urlencoded
        // cache-control: no-cache
        // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)
        // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
        // Accept: */*
        // Host: 127.0.0.1:8080
        // accept-encoding: gzip, deflate
        // content-length: 20
        // Connection: keep-alive
        //
        // username=Jack&passwd=000000
        Log.i(request.toString());
        parseRequestHeader(request.toString());
    }



    /**
     * 解析请求头
     */
    private void parseRequestHeader(String requestHead) {
        int idx1, idx2;
        idx1 = requestHead.indexOf(' ');
        if (idx1 != -1) {
            idx2 = requestHead.indexOf(' ', idx1 + 1);
            if (idx2 > idx1) {
                String reqString = requestHead.substring(idx1 + 1, idx2);
                this.methon = requestHead.substring(0, idx1);
                Log.m("req methon: ");
                Log.m(this.methon);

                // reqString 中包含 "?" 则存在 query 
                if (reqString.indexOf("?") != -1) {
                    String[] reqStringArr = reqString.split("[?]");
                    this.searchString = reqStringArr.length > 1 ? reqStringArr[1] : null;
                    Log.i(this.searchString);
                    if (null != this.searchString) {
                        this.queryMap = new HashMap<String, String>();
                        String[] getArr = this.searchString.split("&");
                        for (int i = 0; i < getArr.length; i++) {
                            String kvStr = getArr[i];
                            String[] kvArr = kvStr.split("=");
                            if (kvArr.length == 2) {
                                this.queryMap.put(kvArr[0], kvArr[1]);
                            }
                        }
                    }
                    reqString = reqStringArr[0];
                }
                // 从InputStream中读取request信息，并从request中获取uri值
                this.uri = reqString;

                // reqString 中包含 Content-Type: application/x-www-form-urlencoded 则存在 body
                // 当然我们还得考虑 Conten-Type: application/json 等 POST 情况 
                // TODO: 补充其他类型的 POST请求
                if (requestHead.indexOf("Content-Type: application/x-www-form-urlencoded") != -1) {
                    String[] bodyStringArr = requestHead.split("\r\n\r\n");
                    this.bodyString = bodyStringArr.length > 1 ? bodyStringArr[1] : null;
                    Log.i(this.bodyString);
                    if (null != this.bodyString) {
                        this.bodyMap = new HashMap<String, String>();
                        String[] postArr = this.bodyString.split("&");
                        for (int i = 0; i < postArr.length; i++) {
                            String kvStr = postArr[i];
                            String[] kvArr = kvStr.split("=");
                            if (kvArr.length == 2) {
                                this.bodyMap.put(kvArr[0], kvArr[1]);
                            }
                        }
                    }
                } 
            }

        }

    }

    /**
     * 获取 GET 参数
     * @param key
     * @return
     */
    public Object GET(String key) {
        return null != this.queryMap ? this.queryMap.get(key) : null;
    }

    /**
     * 获取 POST 参数
     * @param key
     * @return
     */
    public Object POST(String key) {
        return null != this.bodyMap ? this.bodyMap.get(key) : null;
    }

    public String getUri() {
        return uri;
    }
}
```
 
### Response.java 封装响应对象

 
```java
package com.xiaoping.server;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;
import com.xiaoping.util.Log;

import java.io.IOException;
import java.io.FileInputStream;
import java.io.File;

public class Response {

    private static final int BUFFER_SIZE = 1024;
    private Request request;
    private OutputStream output;
    // 响应码与响应表头的 K-V
    private static Map<Integer, String> statusMap = null;

    // 响应头
    private Map<String, String> headers = null;

    // 默认响应状态 200 OK
    private int status = 200;

    // 响应编码
    private String charset = "utf-8";

    // 响应 mime 类型
    private String contenType = "text/html";

    static {
            if(statusMap == null) {
                statusMap = new HashMap<>();
                statusMap.put(101, "HTTP/1.1 101 Switching Protocols\r\n");
                statusMap.put(200, "HTTP/1.1 200 OK\r\n");
                statusMap.put(201, "HTTP/1.1 201 Created\r\n");
                statusMap.put(202, "HTTP/1.1 202 Accepted\r\n");
                statusMap.put(204, "HTTP/1.1 204 No Content\r\n");
                statusMap.put(300, "HTTP/1.1 300 Multiple Choices\r\n");
                statusMap.put(301, "HTTP/1.1 301 Moved Permanently\r\n");
                statusMap.put(302, "HTTP/1.1 302 Moved Temporarily\r\n");
                statusMap.put(304, "HTTP/1.1 304 Not Modified\r\n");
                statusMap.put(400, "HTTP/1.1 400 Bad Request\r\n");
                statusMap.put(401, "HTTP/1.1 401 Unauthorized\r\n");
                statusMap.put(403, "HTTP/1.1 403 Forbidden\r\n");
                statusMap.put(404, "HTTP/1.1 404 Not Found\r\n");
                statusMap.put(500, "HTTP/1.1 500 Internal Server Error\r\n");
                statusMap.put(501, "HTTP/1.1 501 Not Implemented\r\n");
                statusMap.put(502, "HTTP/1.1 502 Bad Gateway\r\n");
                statusMap.put(503, "HTTP/1.1 503 Service Unavailable\r\n");
            }
    }

    public Response(OutputStream output) {
        this.output = output;
        this.headers = new HashMap<String, String>();
    }

    /**
     * 设置响应状态
     * @param status
     */
    public void setStatus(int status) {
        this.status = status;
    }

    /**
     * 设置响应类型
     * @param mimeType
     */
    public void setContenType (String mimeType) {
            this.contenType = mimeType;
            setHeader("Content-Type", mimeType + ";charset=" + this.charset);
    }

    /**
     * 设置响应字符编码
     * @param charset
     */
    public void setCharset(String charset) {
        this.charset = charset;
        setHeader("Content-Type", this.contenType + ";charset=" + charset);
    }

    /**
     * 设置响应内容
     * @param file
     * @throws IOException
     */
    public void setContent(File file) throws IOException {
            this.contenType = Files.probeContentType( Paths.get(file.getName()) );
            setHeader("Content-Length", String.valueOf( file.length() ));
    }

    public void setContent(String content) {
            setHeader("Content-Length", String.valueOf( content.length() ));
    }

    /**
     * 设置响应头
     * @param key
     * @param val
     */
    public void setHeader(String key, String val) {
            this.headers.put(key, val);
    }

    public void setRequest(Request request) {
        this.request = request;
    }

    /**
     * 获取响应标头
     * @return
     */
    private String getStatusString() {
            return Response.statusMap.get(this.status) == null? Response.statusMap.get(500) : Response.statusMap.get(this.status);
    }

    private String getStatusString(int status) {
            this.status = status;
            return getStatusString();
    }

    /**
     * 获取响应头的字节数组
     * @return
     */
    private byte[] getResponseHeaderBytes() {
            String headerString = "";
            for (String key: headers.keySet()) {
                if(null != key && null != headers.get(key)) {
                    headerString += key + ": " + headers.get(key) + "\r\n";
                }
        }
            String str = getStatusString() + headerString + "\r\n";
            return str.getBytes();
    }

    /**
     * 响应请求
     * @param data
     * @throws IOException
     */
    private void send(byte[] data) throws IOException {
        output.write(getResponseHeaderBytes());
        output.write(data);
    }

    public void send(String str) throws IOException {
            send(str.getBytes());
    }

    public void send(Object obj) throws IOException {
            Gson gson = new Gson();
            setContenType("application/json");
            send(gson.toJson(obj));
    }

    public void send(File file) throws IOException {
            byte[] bytes = new byte[BUFFER_SIZE];
            FileInputStream fis = null;
            if( file.exists() && file.isFile() ) {
                output.write(getResponseHeaderBytes());
                fis = new FileInputStream(file);
                int ch = fis.read(bytes, 0, BUFFER_SIZE);
                while (ch != -1 ) {
                    output.write(bytes, 0, ch);
                    ch = fis.read(bytes, 0, BUFFER_SIZE);
                }
                fis.close();
            }else {
                // file 不存在或不是一个文件
                // TODO:这里也可以替换成一个文件
                setStatus(404);
                String content = "<html><body><h1>File Not Found</h1></body></html>";
                setContent(content);
                send(content);
            }
    }

    /**
     * 发送静态资源
     * @throws IOException
     */
    public void sendStaticResource() throws IOException {
            Log.i(request.getUri());
            String Uri = request.getUri();
            if(null == Uri || Uri.equals("/") || Uri.equals("")) {
                Uri = Server.WEB_INDEX;
            }
        File file = new File(Server.WEB_ROOT, Uri);

            send(file);

    }   
}
```
 
### App.java 启动类

 
```java
package com.xiaoping.server;


import java.io.IOException;
import com.xiaoping.util.Log;

public class App {

    public static void main(String[] args) throws NoSuchMethodException, SecurityException {
        //Log.isDebug = false;
        Log.i("plz wait a sec...");

        Server server = Server.getInstance();

        // use 方法需要在 listen 之前调用，否则不会生效
        server.use("/user/login", App.class, "login");

        // 启动 server
        server.listen(8080);

    }

    /**
     * 登录 Api
     * @param req
     * @param res
     * @throws IOException 
     */
    public void login(Request req, Response res) throws IOException {
        Log.m("function login invoke.");
        Result rs = new Result();
        // TODO: DB 操作
        if( "admin".equals(req.GET("user_name")) && "123456".equals(req.GET("pwd")) ) {
            // login success
            res.send(rs);
        } else {
            // login fail
            rs.setting("error", -1, "fail");
            res.send(rs);
        }
    }

    class Result {
        public String type = "success";
        public int err = 0;
        public String msg = "ok";

        public Result() {
            super();
        }

        public Result(String type, int err, String msg) {
            super();
            this.type = type;
            this.err = err;
            this.msg = msg;
        }

        public void setting(String type, int err, String msg) {
            this.type = type;
            this.err = err;
            this.msg = msg;
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
