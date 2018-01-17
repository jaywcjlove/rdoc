const PATH = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('rdoc-dev-utils/WatchMissingNodeModulesPlugin');
const CreateSpareWebpackPlugin = require('create-spare-webpack-plugin');
const config = require('./webpack.config');
const paths = require('./paths');

module.exports = function (cmd) {
  config.entry = [
    require.resolve('webpack-hot-dev-clients/webpackHotDevClient'),
    paths.appIndexJs,
  ];

  // 高级输出配置
  // https://webpack.js.org/configuration/output/#output-path
  // 告诉Webpack将包含有关所包含模块信息的包含注释。
  // 此选项默认为false，不应在生产中使用，但在读取生成的代码时非常有用。
  config.output.pathinfo = true;
  // 这不会产生真实的文件。
  // 这只是WebpackDevServer在开发中提供的虚拟路径。
  // 这是包含所有入口点的代码和Webpack运行时的JS包。
  config.output.filename = '[name].js';

  config.module.loaders = config.module.loaders.map((item)=>{
    if (item.oneOf){
      const loaders = [];
      loaders.push({
        // Process JS with Babel.
        test: /\.(js|jsx|mjs)$/,
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
            },
          },
        ],
      });
      loaders.push({
        test: /\.json$/,
        use: [
          {
            loader: require.resolve('raw-tree-replace-loader'),
            options: {
              include: /rdoc\.tree\.data\.json$/, // 检查包含的文件名字
              directoryTrees: { // 指定目录生成目录树，json
                dir: cmd.markdownPaths,
                mdconf: true,
                extensions: /\.md/,
              }
            }
          }
        ]
      })
      loaders.push({
        test: /\.(css|less)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[name]-[hash:base64:5]',
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          require.resolve('less-loader'),
        ],
      })

      item.oneOf = loaders.concat(item.oneOf);
    }
    return item;
  })

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      favicon: paths.defaultFaviconPath,
      inject: true,
      template: paths.defaultHTMLPath,
    }),
    // 将模块名称添加到工厂功能，以便它们显示在浏览器分析器中。
    // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
    new webpack.NamedModulesPlugin(),
    new CreateSpareWebpackPlugin({
      // 备用文件目录，比对是否存在，不存在生成，根据sep 目录规则生成
      path: PATH.join(paths.catchDirPath, './md'),
      sep: '___', // 检查目标目录文件，文件名存储，文件夹+下划线间隔+文件名
      directoryTrees: { // 索引目录
        dir: cmd.markdownPaths,
        mdconf: true,
        extensions: /\.md$/,
      },
    }),
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
