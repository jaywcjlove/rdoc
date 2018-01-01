<!--
title: 安装 
sort: 2
-->

RDoc 是一套基于基于[Webpack](https://webpack.js.org/)，[React](https://reactjs.org/)，[React Router](https://reacttraining.com/react-router/web/guides/philosophy) 封装的文档生成工具，用于生成React组件库文档或博客网站，

> 在开始之前，推荐先学习 Markdown语法，并正确安装和配置了 [Node.js](https://nodejs.org) v8.0 或以上。

## 安装

```shell
$ mkdir doc-example && cd doc-example
$ npm init -y # 初始化一个 package.json
$ npm i rdoc  # 安装到当前项目中
```

## 全局安装

并不推荐这种方法，时间长了就不知道文档是使用什么版本的 `rdoc` 生成的。

```shell
$ npm install rdoc -g
```

## 开发模式安装

这里是通过开发调试模式安装，因为没有开源，所以没有提供`npm install`方式安装

```shell
$ git clone https://github.com/jaywcjlove/rdoc.git
$ cd rdoc

## 全局命令安装使用
$ npm link
## updated 2 packages in 8.343s
## /usr/local/bin/rdoc -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js
## /usr/local/lib/node_modules/rdoc -> /Users/****/rdoc

$ cd doc-example # 进入项目
$ npm link rdoc
```

上面方法也是开发模式运行方法。
