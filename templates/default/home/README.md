<!--
title: RDoc
layout: IndexLayout
visible: true
-->

<style>
.markdown{
  padding: 0 30px;
}
.jumbotron {
  position: relative;
  background-color: #383838;
  margin: 0 -30px 20px -30px;
  padding-top: 120px;
  padding-left: 59px;
  padding-right: 100px;
  min-height: 400px;
  color: #c1c1c1;
}
.jumbotron-title {
  font-size: 60px;
  font-weight: bold;
  text-align: center;
}
.jumbotron-des {
  text-align: center;
}
</style>
<div class="jumbotron">
  <div class="jumbotron-title">RDoc </div>
  <div class="jumbotron-des">RDoc 是一套基于React的文档生成工具，用于生成文档网站或简单的博客网站</div>
</div>

在开始之前，推荐先学习 Markdown 语法，并正确安装和配置了 [Node.js](https://nodejs.org) v8.0 或以上。。

用于生成React组件库文档或简单的博客网站

```bash
npm install rdoc -g   # 安装工具
rdoc init my-project  # 初始化项目

cd my-project && npm start # 进入工程，启动服务
```


### Command

```shell
Usage: rdoc [options]

Fast static site generator for React.

Options:

  -i, init [path]        Create an empty website or reinitialize an existing one.
  -d, --doc <path>       Other documents generated.
  -o, --output <path>    Writes the compiled file to the disk directory. (default: dist)
  -p, --port [number]    The port. (default: 5858)
  -h, --host [host]      The host. (default: 0.0.0.0)
  -b, --branch <branch>  Name of the branch you are pushing to. (default: gh-pages)
  --publish [url]        Other documents generated.
  --build                Creating an optimized production build.
  --clean                Delete the .cache folder.
  -h, --help             output usage information

Examples:

  $ rdoc init
  $ rdoc init doc-example
  $ rdoc -d doc/mm
  $ rdoc -d tutorial,doc
  $ rdoc -d tutorial,doc --clean --build
  $ rdoc -p 2323  -d doc --clean
  $ rdoc -h 0.0.0.0 -d doc --clean
  $ rdoc --publish https://git_repo.git --branch master
```
