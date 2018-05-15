<!--
title: 连接地址
sort: 7
-->

目前 rdoc 支持 Markdown 连接，同时支持代码编辑器预览。

## Markdown 语法连接

### 常用链接方法

```markdown
文字链接 [链接名称](http://链接网址)
网址链接 <http://链接网址>
```

### 高级链接技巧

```markdown
这个链接用 1 作为网址变量 [Google][1].  
这个链接用 yahoo 作为网址变量，鼠标悬停在连接地址上还有提示。 [Yahoo!][yahoo].  
这个链接用 stackoverflow 作为网址变量 [StackOverflow 博客][stackoverflow].  
然后在文档的结尾为变量赋值（网址）  

  [1]: http://www.google.com/
  [yahoo]: http://www.yahoo.com/ "这是个雅虎首页"
  [stackoverflow]: https://stackoverflow.blog/
```

这个链接用 1 作为网址变量 [Google][1].  
这个链接用 yahoo 作为网址变量，鼠标悬停在连接地址上还有提示。 [Yahoo!][yahoo].  
这个链接用 stackoverflow 作为网址变量 [StackOverflow 博客][stackoverflow].  
然后在文档的结尾为变量赋值（网址）  

  [1]: http://www.google.com/
  [yahoo]: http://www.yahoo.com/ "这是个雅虎首页"
  [stackoverflow]: https://stackoverflow.blog/

## 内嵌代码编辑器支持

### 编辑器 runjs.cn 展示效果

直接将网址 `http://runjs.cn/code/sz8sivay` 贴入 Markdown 中，出如下预览效果。

http://runjs.cn/code/sz8sivay

### 编辑器 jsfiddle.net 展示效果

直接将网址 `https://jsfiddle.net/jaywcjlove/sxx57x6m/` 贴入 Markdown 中，出如下预览效果。

https://jsfiddle.net/jaywcjlove/sxx57x6m/


### 编辑器 codepen.io 展示效果

直接将网址 `https://codepen.io/jaywcjlove/pen/deqGxX` 贴入 Markdown 中，出如下预览效果。

https://codepen.io/jaywcjlove/pen/deqGxX
