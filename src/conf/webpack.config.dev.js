
const PATH = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DirectoryTreesPlugin = require('directory-trees-webpack-plugin');
const paths = require('./paths');
const WatchMissingNodeModulesPlugin = require('rdoc-dev-utils/WatchMissingNodeModulesPlugin');

module.exports = function (cmd) {
  config.entry = [
    require.resolve('webpack-hot-dev-clients/webpackHotDevClient'),
    paths.appIndexJs,
  ];

  config.output.path = paths.appBuild;
  // 高级输出配置
  // https://webpack.js.org/configuration/output/#output-path
  // 告诉Webpack将包含有关所包含模块信息的包含注释。
  // 此选项默认为false，不应在生产中使用，但在读取生成的代码时非常有用。
  config.output.pathinfo = true;
  // 这不会产生真实的文件。
  // 这只是WebpackDevServer在开发中提供的虚拟路径。
  // 这是包含所有入口点的代码和Webpack运行时的JS包。
  config.output.filename = '[name].js';
  config.output.chunkFilename = 'static/[name].js';
  config.output.publicPath = paths.publicPath;

  config.module.loaders = config.module.loaders.map((item)=>{
    if (item.oneOf){
      const loaders = [];
      loaders.push({
        // Process JS with Babel.
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /\.(cache)/],
        use: [
          {
            loader: require.resolve('string-replace-loader'),
            options: {
              multiple: [
                { search: '__project_root__', replace: paths.projectPath },
              ],
            },
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              // 这是webpack的“babel-loader”（不是Babel本身）的一个功能。
              // 它启用缓存结果./node_modules/.cache/babel-loader/
              // 用于更快重建的目录。
              cacheDirectory: true,
              // https://stackoverflow.com/questions/29576341/what-does-the-code-generator-has-deoptimised-the-styling-of-some-file-as-it-e
              // compact: false,
              // allowImportExportEverywhere: true,
            },
          },
        ],
      });
      item.oneOf = loaders.concat(item.oneOf);
    }
    return item;
  })

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.defaultHTMLPath,
    }),
    new DirectoryTreesPlugin({
      dir: cmd.markdownPaths,
      path: paths.docTreePath ,
      // 将监听的文件放到指定的目录重新命名
      watch: {
        dir: PATH.join(paths.catchDirPath, './md'),
        filename: 'underline',
        sep: '___',
      },
      mdconf: true, // 存在Markdown设置
      extensions: /\.md/,
    }),
    // 将模块名称添加到工厂功能，以便它们显示在浏览器分析器中。
    // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
    new webpack.NamedModulesPlugin(),
    // 如果您需要一个缺少的模块，然后再安装npm，那么您仍然需要重新启动Webpack的开发服务器来发现它。
    // 此插件使自动发现，所以您不必重新启动。
    new WatchMissingNodeModulesPlugin([paths.appNodeModules, paths.defaultNodeModules]),
  ])

  // 在开发过程中关闭性能提示，因为我们不做任何感兴趣的拆分或缩小。
  // 这些警告变得很麻烦。
  config.performance = {
    hints: false,
  }

  // // 下一行未在dev中使用，但WebpackDevServer没有崩溃：
  // path: paths.appBuild,
  // console.log('rdocPath:', JSON.stringify(config,null,2));
  // console.log('rdocPath:', paths);
  // console.log('rdocPath:', config);

  return config;
}
