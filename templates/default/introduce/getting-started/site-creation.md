<!--
title: 创建网站 
sort: 4
-->

根据你创建的目录结构，配置命令生成网站

## 生成配置文件

生成 `package.json` 文件

```shell
$ npm init -y
```

## 配置命令

```shell
$ rdoc -c src/components # 这个是特殊配置，Markdown里面默认可以运行ReactDemo
$ rdoc -d doc/mm
$ rdoc -c src/component -d tutorial,doc
```

> `-c src/components` 参数 `-d` 指定的目录是有目录顺序的  
> `-d tutorial,doc` 参数 `-d` 指定目录，目录是有顺序的，用英文`,`逗号间隔不同的目录  

## 配置npm命令

将上面命令实例，添加到 `package.json` 的 `scripts` 中。实例如下：

```json
{
  "name": "doc-example",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "doc": "rdoc -c src/component -d index,introduce,faq,doc --clean"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 运行命令

命令配置好之后，你就可以，通过 `npm` 运行它，将自动打开网址 http://localhost:3990/。

```shell
$ npm run doc

## Compiled successfully!

## You can now view doc-example in the browser.

##  Local:            http://localhost:3990/
##  On Your Network:  http://192.168.188.109:3990/

## Note that the development build is not optimized.
## To create a production build, use npm run build.
```
