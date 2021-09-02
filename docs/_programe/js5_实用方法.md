---
date: 2020-01-20 14:06
author: xiaop1ng
location: ShenZhen
title: JavaScript —— 实用方法
tags:
  - js
---

# JavaScript —— 实用方法

- [VConsole 的使用](https://github.com/Tencent/vConsole)

```html
<script src="https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js"></script>
<script>
	var vConsole = new VConsole();
</script>
```

- 是否是微信浏览器

```js
var isWeixinBrowser = function () {
  return window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
}
```

- 前端保存文件

```js
/**
 * data: 文件内容，详情参考 https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
 * filename: 文件名称
 * type: 文件类型
 * 
 * 使用示例：download('select * from life', '查询脚本', 'sql');
 */
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
```

- js 触发事件（模拟click事件）

```js
/**
 * selector: 选择器
 * 使用示例：mockClick('#btnSubmit')
 */
var mockClick = function(selector) {
    //获取btn
    var btn = document.querySelector(selector);
    //创建event
    var event = document.createEvent("MouseEvents");
    //初始化event
    event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
    //触发事件
    btn.dispatchEvent(event);
}
```

- js 复制内容到剪切板

```js
var copytext = function (txt) {
    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', txt);
    document.body.appendChild(input);
    input.focus();
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        alert('复制成功');
    } else {
        alert("请长按选择复制");
    }
    document.body.removeChild(input);
}
```

- uuid

```js
var uuid = function () { // uuid
	for (var a = [], b = "0123456789abcdef", c = 0; 36 > c; c++)
		a[c] = b.substr(Math.floor(16 * Math.random()), 1);
	a[14] = "4",
	a[19] = b.substr(3 & a[19] | 8, 1),
	a[8] = a[13] = a[18] = a[23] = "";
	var d = a.join("");
	return d
}
```

- copy

```js
var copy = function (obj) {
	return JSON.parse(JSON.stringify(obj)); 
}
```

- 判断匹配中文

```js
var isZh = function (txt) {
	return /^[\u4e00-\u9fa5]*$/.test(txt);
}
```
- 判断匹配手机号

```js
var isMobile = function (txt) {
    return /^1[0-9]{10}$/.test(txt);
}
```

- 判断匹配邮箱

```js
var isEmail = function (txt) {
    return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(txt);
}
```

- 数字补 0，如：1 -> 01, 2 -> 02, 8 -> 08

```js
var prefixZero = function (num) {
    return num >= 10 ? num : "0" + num;
}
```

Base64
```js
// encode
window.btoa("xiaoping"); // eGlhb3Bpbmc=

// decode
window.atob("eGlhb3Bpbmc=") // xiaoping
```

客户端是否支持字体

```
var isSupportFontFamily=function(f){if(typeof f!="string"){return false}var h="Arial";if(f.toLowerCase()==h.toLowerCase()){return true}var e="a";var d=100;var a=100,i=100;var c=document.createElement("canvas");var b=c.getContext("2d");c.width=a;c.height=i;b.textAlign="center";b.fillStyle="black";b.textBaseline="middle";var g=function(j){b.clearRect(0,0,a,i);b.font=d+"px "+j+", "+h;b.fillText(e,a/2,i/2);var k=b.getImageData(0,0,a,i).data;return[].slice.call(k).filter(function(l){return l!=0})};return g(h).join("")!==g(f).join("")};
```

获取字符串中的数字
```js
var str = '1.9abc!@#456';
str = Number(str.replace(/[^0-9|.]/ig, ''));  // 1.9456
```

返回到 history 的第一个页面

> history.go(-history.length+1);


- 比较日期函数(兼容 ios 方法)

```js
function dateThan ( startDate , endDate ) {
    var sysDate = new Date();
    var start_date = new Date(startDate.replace(/\./g,'-'));
    var end_date = new Date(endDate.replace(/\./g,'-'));
    start_date.setHours(0);
    start_date.setMinutes(0);
    start_date.setSeconds(0)
    end_date.setHours(23);
    end_date.setMinutes(59);
    end_date.setSeconds(59);
    if (sysDate < start_date) {
        return 0;// 未开始
    } else if (sysDate > end_date) {
        return 2;// 已结束
    } else {
        return 1;// 正常（区间内）
    }
}
```

- ES6 `...` 运算符

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

> 对象中的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中

```js
function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
add(...numbers) // 42
```

> 在数组中扩展运算符(...)将数组转换为参数序列

- 输入框值改变的事件
```js
$("input").on("input", function () {
    console.log("正在输入...");
});
```


- IOS input 位置偏移
```
inputBlur() {
    // ios
    window.scroll(0,0);
}
```

- 金额格式化
```js
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

var formatMoney = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
```


- 解决点击返回页面不刷新的问题
```js
window.onpageshow = function(event) {
    //解决点击返回页面不刷新的问题
    if (event.persisted) {
        window.location.reload();
    }
};
```

- 解决输入框被键盘挡住的问题

```js
window.addEventListener('resize', function () {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        window.setTimeout(function () {
            document.activeElement.scrollIntoViewIfNeeded()
        }, 0)
    }
})
```


```java
    private static DataRow dataCalculate(Double max, Double min) {
        if (min >= max) return Terms.newInstance().add("max", max).add("min", min);
        if (Math.abs(min) > max && max > 0) {
            Double tempNum = Math.abs(min);
            Double tempFloat = tempNum / topDigit(tempNum);
            Double tempMin = 0 - niceTick(tempFloat)[0];
            Double tempInterval = niceTick(tempFloat)[1];
            Double tempMax;
            int i = 1;

            tempMin = NumberUtil.round((tempMin * topDigit(tempNum)), 5).doubleValue();
            tempInterval = NumberUtil.round( (tempInterval * topDigit(tempNum)), 5).doubleValue();
            tempMax = tempInterval;

            while (tempMax < max) {
                tempMax = tempInterval * ++i;
            }
            return Terms.newInstance()
                    .add("max", tempMax)
                    .add("min", tempMin)
                    .add("interval", tempInterval);
        } else if (min < 0 && max <= 0) {
            Double tempNum = Math.abs(min);
            Double tempFloat = tempNum / topDigit(tempNum);
            Double tempMin = 0 - niceTick(tempFloat)[0];
            Double tempInterval = niceTick(tempFloat)[1];
            Double tempMax = 0d;

            tempMin = NumberUtil.round( (tempMin * topDigit(tempNum)), 5).doubleValue();
            tempInterval = NumberUtil.round( (tempInterval * topDigit(tempNum)), 5).doubleValue();

            return Terms.newInstance()
                    .add("max", tempMax)
                    .add("min", tempMin)
                    .add("interval", tempInterval);
        } else if (min >= 0 && max > 0) {
            Double tempNum = max;
            Double tempFloat = tempNum / topDigit(tempNum);
            Double tempMax = niceTick(tempFloat)[0];
            Double tempMin;
            Double tempInterval = niceTick(tempFloat)[1];

            tempMax = NumberUtil.round( (tempMax * topDigit(tempNum)), 5).doubleValue();
            tempInterval = NumberUtil.round( (tempInterval * topDigit(tempNum)), 5).doubleValue();
            tempMin = 0d;

            return Terms.newInstance()
                    .add("max", tempMax)
                    .add("min", tempMin)
                    .add("interval", tempInterval);
        } else {
            Double tempNum = max;
            Double tempFloat = tempNum / topDigit(tempNum);
            Double tempMax = niceTick(tempFloat)[0];
            Double tempMin;
            Double tempInterval = niceTick(tempFloat)[1];
            int i = 1;

            tempMax = NumberUtil.round( (tempMax * topDigit(tempNum)), 5).doubleValue();
            tempInterval = NumberUtil.round( (tempInterval * topDigit(tempNum)), 5).doubleValue();
            tempMin = tempInterval;

            while (tempMin > min) {
                tempMin = -tempInterval * ++i;
            }

            return Terms.newInstance()
                    .add("max", tempMax)
                    .add("min", tempMin)
                    .add("interval", tempInterval);
        }
    }

    private static Double[] niceTick(Double val) {
        Double[] max ;

        if (1 <= val && val < 1.5) {                               //根据有效数字，取最大值的有效前两位
            max = new Double[]{1.5, 0.5};
        } else if (1.5 <= val && val < 2) {
            max = new Double[]{2d, 0.5};
        } else if (2 <= val && val < 3) {
            max = new Double[]{3d, 1d};
        } else if (3 <= val && val < 4) {
            max = new Double[]{4d, 1d};
        } else if (4 <= val && val < 5) {
            max = new Double[]{5d, 1d};
        } else if (5 <= val && val < 6) {
            max = new Double[]{6d, 2d};
        } else if (6 <= val && val < 8) {
            max = new Double[]{8d, 2d};
        } else if (8 <= val && val < 10) {
            max = new Double[]{10d, 2d};
        } else {
            // 补充
            max = new Double[]{val, 1d};
        }
        return max;
    }

    private static int quantityExponent(Double val) {
        if (val == 0) {
            return 0;
        }

        int exp = (int) Math.floor(Math.log(val) / Math.log(10));

        if (val / Math.pow(10, exp) >= 10) {
            exp++;
        }

        return exp;
    }

    private static Double topDigit(Double val){
        return Math.pow(10, quantityExponent(val));
    }
```