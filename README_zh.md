<p align="center">
  <a href="https://react-doc.github.io">
    <img width="150" src="theme/default/rdoc.logo.svg?sanitize=true">
  </a>
</p>

rdoc
---

[![Join the chat at https://gitter.im/j-rdoc/Lobby](https://badges.gitter.im/j-rdoc/Lobby.svg)](https://gitter.im/j-rdoc/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![](https://img.shields.io/github/issues/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/issues) [![](https://img.shields.io/github/forks/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/network) [![](https://img.shields.io/github/stars/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/stargazers) [![](https://img.shields.io/github/release/jaywcjlove/rdoc.svg)](https://github.com/jaywcjlove/rdoc/releases) [![jaywcjlove/sb](https://jaywcjlove.github.io/sb/lang/english.svg)](README.md)

基于React的快速静态网站生成器，你只需要写 Markdown 文档即可。访问 [react-doc.github.io](https://react-doc.github.io)网站获取更多信息。

> 这个文档网站就是一个 [demo](https://react-doc.github.io) 实例。

<div align="center">
  <img src="./rdoc.png"> 
</div>

## 开始

**rdoc** 使用非常简单，只需将其它作为模块安装并运行即可创建您的网站。

让我们开始吧！

### 安装

安装 `rdoc` 到你系统的全局，您需要在本地开发计算机上使用 `Node >= 8`。 您可以使用 [n](https://github.com/tj/n#installation) 轻松切换不同项目之间的 Node 版本。


```bash
npm install rdoc -g

# /usr/local/bin/rdoc -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js
# /usr/local/bin/rdoc-cli -> /usr/local/lib/node_modules/rdoc/.bin/rdoc.js
```

增加了 `rdoc-cli` 命令来解决 Mac 集成 `rdoc` 命令冲突。

1. 初始化项目

```bash
rdoc init my-project  # Init project
# 或者
rdoc-cli init my-project 
```

2. 运行网站

```bash
cd my-project && npm install # 进入目录安装依赖
npm start # 启动服务。
```

3. 编译输出静态HTML资源。

```bash
npm run build
```

4. 在 `package.json` 中配置部署 `URL`。

```js
{
  "scripts": {
    "deploy": "rdoc --publish <your repo url>"
    ...
  },
  ...
}
```

5. 部署到 Github `gh-pages` 分支。

```bash
npm run deploy
```

### 命令帮助

```shell
Usage: rdoc [options]

Fast static site generator for React.

Options:

  -i, init [path]        创建一个空的网站或重新初始化一个现有网站。
  -d, --doc <path>       生成指定其他文档。
  -o, --output <path>    将编译的文件写入磁盘目录。（默认：.rdoc-dist）
  -p, --port [number]    端口。(默认: 5858)
  -h, --host [host]      主机. (默认: 0.0.0.0)
  -b, --branch <branch>  <分支>您要推送的分支的名称。（默认：gh-pages）
  --publish [url]        将生成的代码，push到指定仓库，已经分支。
  --build                创建编译的生产版本。
  --clean                删除.cache文件夹。
  -h, --help             输出使用帮助文档。

Examples:

  $ rdoc init
  $ rdoc init doc-example
  $ rdoc -d doc/mm
  $ rdoc -d tutorial,doc
  $ rdoc -d tutorial,doc --clean --build
  $ rdoc -p 2323  -d doc --clean
  $ rdoc -h 0.0.0.0 -d doc --clean
  $ rdoc --publish https://<your-git-repo>.git --branch master
```
### 开发

获取代码，进入目录，运行自动重载构建，：

```shell
$ git clone https://github.com/jaywcjlove/rdoc.git
$ cd rdoc     # 进入目录
$ npm install # or yarn install
```

要开发，请运行自重载构建：

```bash
# 运行应用程序
# 每次代码更改时，自动重新启动应用程序。
# 在开发过程中很有用。
$ npm run start
```

打开浏览器并访问 http://localhost:5858

### Folders

```bash
.
├── README.md
├── .rdoc-dist
├── package.json
├── src
│   ├── build.js
│   ├── commands
│   ├── conf
│   ├── publish.js
│   ├── server.js
│   ├── utils
│   └── web
├── templates
│   └── default # 记录静态文件。
└── theme
    └── default
```

### License

The MIT License (MIT)
