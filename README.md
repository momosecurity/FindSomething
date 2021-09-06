# FindSomething
FindSomething，被动式信息泄漏检测工具
## chrome插件
1. 使用chrome开发者模式加载源码。  
2. 直接访问 https://chrome.google.com/webstore/detail/findsomething/kfhniponecokdefffkpagipffdefeldb
## firefox插件
1. 切换到firefox分支，使用“调试附加组件”加载。  
2. 直接访问 https://addons.mozilla.org/zh-CN/firefox/addon/findsomething/

## 2.0.1版本
- 根据Hae的开源的公共规则更新了身份证、手机号、邮箱、jwt等字段的正则表达式，非常感谢开源的公共规则。https://gh0st.cn/HaE/
- 新增了加密/签名算法函数的匹配，对应算法与关键字为base64(base64、btoa、atob)、aes(CryptoJS.AES)、des(CryptoJS.DES)、rsa(JSEncrypt、rsa、KJUR)、md5(md5)、sha1(sha1)、sha256(sha256)、sha512(sha512)。

## 2.0.0版本
- ip、ip端口、域名、路径、url、静态路径、身份证、手机号、邮箱等字段匹配与展示。
