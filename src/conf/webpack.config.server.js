const paths = require('./paths');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = function (allowedHost, cmd) {
  return {
    // 启用生成文件的gzip压缩。
    compress: true,
    // 沉默WebpackDevServer自己的日志，因为它们通常没有用处。
    // 这个设置仍然会显示编译警告和错误。
    clientLogLevel: 'none',
    // 启用热重载服务器。 它将提供/ sockjs-node / endpoint
    // 用于WebpackDevServer客户端，以便可以了解文件的时间
    // 更新。 包含WebpackDevServer客户端作为入口点
    // 在Webpack开发配置中。 请注意，只有更改
    // 到CSS当前热重新加载。 JS更改将刷新浏览器。
    hot: true,
    inline: true,
    // 告诉WebpackDevServer使用相同的“根”路径是很重要的
    // 正如我们在配置中指定的那样。 在开发中，我们始终服务于/。
    publicPath: paths.publicPath,
    // WebpackDevServer默认是嘈杂的，所以我们发出自定义消息
    // 通过上面的`compiler.plugin`调用来监听编译器事件。
    quiet: true,
    // 这样可以避免某些系统的CPU过载。
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
    },
    // 通知服务器观察由devServer.contentBase选项提供的文件。 文件更改将触发整页重新加载。
    contentBase: cmd.markdownPaths,
    watchContentBase: true,
    // 如果HTTPS环境变量设置为“true”，则启用HTTPS
    https: protocol === 'https',
    host: cmd.host,
    overlay: false,
    historyApiFallback: {
      // 带点的路径仍应使用历史回退。
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    public: allowedHost,
  };
};
