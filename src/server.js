const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const detect = require('detect-port');
const load = require('loading-cli');
const conf = require('./conf/webpack.config.dev');
require('colors-cli/toxic');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = function server(cmd) {
  const HOST = cmd.host;
  let DEFAULT_PORT = cmd.port;
  const webpackConf = conf(cmd);
  const compiler = webpack(webpackConf);
  const loading = load('Compiler is running...'.green).start();
  loading.color = 'green';

  // https://webpack.js.org/api/compiler-hooks/#aftercompile
  // 编译完成之后打印日志
  compiler.hooks.done.tap('done', () => {
    loading.stop();
    // eslint-disable-next-line
    console.log(`\nDev Server Listening at ${`http://${HOST}:${DEFAULT_PORT}`.green}`);
  });

  detect(DEFAULT_PORT).then((_port) => {
    if (DEFAULT_PORT !== _port) DEFAULT_PORT = _port;
    new WebpackDevServer(compiler, {
      // 启用生成文件的gzip压缩。
      compress: true,
      // 沉默WebpackDevServer自己的日志，因为它们通常没有用处。
      // 这个设置仍然会显示编译警告和错误。
      clientLogLevel: 'none',
      // contentBase: conf.output.appPublic,
      publicPath: webpackConf.output.publicPath,
      hot: true,
      historyApiFallback: {
        // 带点的路径仍应使用历史回退。
        // See https://github.com/facebookincubator/create-react-app/issues/387.
        disableDotRule: true,
      },
      // historyApiFallback: true,
      // WebpackDevServer默认是嘈杂的，所以我们发出自定义消息
      // 通过上面的`compiler.plugin`调用来监听编译器事件。
      quiet: true,
      // 如果HTTPS环境变量设置为“true”，则启用HTTPS
      https: protocol === 'https',
      // 这样可以避免某些系统的CPU过载。
      watchOptions: {
        ignored: /node_modules/,
      },
    }).listen(DEFAULT_PORT, HOST, (err) => {
      if (err) {
        return console.log(err); // eslint-disable-line
      }
      // open browser
      opn(`http://${HOST}:${DEFAULT_PORT}`);
    });
  }).catch((err) => {
    console.log(err); // eslint-disable-line
  });
};
