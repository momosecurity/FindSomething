# 变更日志
此项目的所有显著更改将记录在此文件中。


## [2.0.1]-2021-06-26
### 添加
- 新增了加密/签名算法函数的匹配，对应算法与关键字为base64(base64、btoa、atob)、aes(CryptoJS.AES)、des(CryptoJS.DES)、rsa(JSEncrypt、rsa、KJUR)、md5(md5)、sha1(sha1)、sha256(sha256)、sha512(sha512)。
### 变更
- 根据Hae的开源的公共规则更新了身份证、手机号、邮箱、jwt等字段的正则表达式，非常感谢开源的公共规则。https://gh0st.cn/HaE/

## [2.0.0]-2020-09-12
### 添加
- ip、ip+端口、域名、路径、url、静态路径、身份证、手机号、邮箱等字段匹配与展示
