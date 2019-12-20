(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{300:function(s,a,t){"use strict";t.r(a);var e=t(4),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"jwt-json-web-tokens-介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jwt-json-web-tokens-介绍"}},[s._v("#")]),s._v(" JWT ( JSON WEB TOKENS) 介绍")]),s._v(" "),t("h2",{attrs:{id:"官网"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#官网"}},[s._v("#")]),s._v(" 官网")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://jwt.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://jwt.io/"),t("OutboundLink")],1)]),s._v(" "),t("h2",{attrs:{id:"结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#结构"}},[s._v("#")]),s._v(" 结构")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("eyJhbGciOiJIUzEiLCJ0eXAiOiJKV1QifQ.eyJ1c2VySWQiOjI1Njk0LCJyb2xlSWQiOjAsInVzZXJuYW1lIjoic3R1NCIsImV4cCI6MTU2MzM1MTUzNS40Mjh9.bG9naWptQ2d5Ni9kckhWeXhaSWtwc2hmOFRjPQ\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20190801133459612.png",alt:"jwt"}})]),s._v(" "),t("p",[s._v("JSON WEB TOKEN 它是一个很长的字符串，中间用点（"),t("code",[s._v(".")]),s._v("）分割成三部分：")]),s._v(" "),t("ul",[t("li",[s._v("Header（头部）")]),s._v(" "),t("li",[s._v("Payload（负载）")]),s._v(" "),t("li",[s._v("Signature（签名）")])]),s._v(" "),t("p",[s._v("也就是")]),s._v(" "),t("blockquote",[t("p",[s._v("Header.Payload.Signature")])]),s._v(" "),t("h3",{attrs:{id:"header-部分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#header-部分"}},[s._v("#")]),s._v(" Header 部分")]),s._v(" "),t("p",[s._v("Header 部分是一个 JSON 对象，用来描述 JWT 的元数据")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"alg"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"HS256"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"typ"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"JWT"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[t("code",[s._v("alg")]),s._v(" 描述签名的算法，默认是 HMAC SHA256（写成 HS256），"),t("code",[s._v("typ")]),s._v(" 描述令牌的类型；最后会将该 JSON 进行 Base64URL 算法转成字符串")]),s._v(" "),t("h3",{attrs:{id:"payload-部分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#payload-部分"}},[s._v("#")]),s._v(" Payload 部分")]),s._v(" "),t("p",[s._v("Payload 部分也是一个 JSON 对象进行 Base64URL 转换，用于存放实际需要传递的数据。")]),s._v(" "),t("p",[s._v("JWT 规定了一些字段供选用：")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("iss (issuer)：签发人\nexp (expiration time)：过期时间\nsub (subject)：主题\naud (audience)：受众\nnbf (Not Before)：生效时间\niat (Issued At)：签发时间\njti (JWT ID)：编号\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[s._v("我们也可以将我们需要传递的信息（如：user_id 等用于标识用户的信息）放到这个 JSON 当中。")]),s._v(" "),t("div",{staticClass:"language-json line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-json"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"iss"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"auth0"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"id"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"exp"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1564554097")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token property"}},[s._v('"username"')]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"xiaop1ng"')]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h3",{attrs:{id:"signature-部分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#signature-部分"}},[s._v("#")]),s._v(" Signature 部分")]),s._v(" "),t("p",[s._v("首先，需要指定一个密钥（secret）,这个密钥只有服务器才知道。")]),s._v(" "),t("p",[s._v("这个私钥用来计算签名，使用 Header 中指定的算法（默认 HMAC SHA256 ）来产生签名。")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),s._v(" signature "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("HMACSHA256")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("base64UrlEncode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("header"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"."')]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("base64UrlEncode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("payload"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  secret"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[s._v("同样我们使用这个方法来验证签名，可以有效防止数据被篡改。")]),s._v(" "),t("h2",{attrs:{id:"jwt-的使用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jwt-的使用"}},[s._v("#")]),s._v(" jwt 的使用")]),s._v(" "),t("p",[s._v("通常我们会将 token 存放在 HTTP 请求头的 "),t("code",[s._v("Authorization")]),s._v(" 中")]),s._v(" "),t("div",{staticClass:"language-html line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-html"}},[t("code",[s._v("Authorization: Bearer "),t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token tag"}},[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("token")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("然后服务端需要验证用户的时候，获取 "),t("code",[s._v("Authorization")]),s._v(" 中 token 部分进行签名验证即可。")]),s._v(" "),t("p",[s._v("后面会写一篇在 web 服务中使用这种方式做用户验证的 blog。")])])}),[],!1,null,null,null);a.default=n.exports}}]);