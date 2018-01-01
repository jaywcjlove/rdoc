<!--
title: 命令说明 
sort: 1
-->


## 命令帮助

```shell
Usage: rdoc [options]

Options:

  -i, init [path]    Create an empty website or reinitialize an existing one.
  -d, --doc <path>   Other documents generated.
  -p, --port [port]  The port. (default: 6666)
  --clean            Delete the .cache folder.
  -h, --help         output usage information

Examples:

  $ rdoc -d doc/mm
  $ rdoc init
  $ rdoc init doc-example
  $ rdoc -d tutorial,doc
  $ PORT=3333 rdoc -d doc --clean
  $ HOST=0.0.0.0 rdoc -d doc --clean
```


## 命令配置实例

通常情况下，将上面命令配置到 `package.json` 中

```json
{
  "name": "doc-example",
  "version": "1.0.0",
  "scripts": {
    "start": "rdoc -d home,introduce,faq,doc --clean"
  },
  "license": "MIT"
}
```

也可以全局安装，直接运行全局命令，这样的话，每次只能编译一个网站。

```shell
$ rdoc -d doc/mm
$ rdoc -d tutorial,doc
$ PORT=3333 rdoc -d doc --clean
$ HOST=0.0.0.0 rdoc -d doc --clean
```


