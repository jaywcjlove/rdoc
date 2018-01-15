const PATH = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CreateSpareWebpackPlugin = require('create-spare-webpack-plugin');
const CopyMarkdownImageWebpackPlugin = require('copy-markdown-image-webpack-plugin');
const paths = require('./paths');
const config = require('./webpack.config');

module.exports = function (cmd) {
  config.bail = true;
  config.entry = paths.appIndexJs;
  config.module.strictExportPresence = true;
  config.output.path = cmd.output;

  config.module.loaders = config.module.loaders.map((item) => {
    if (item.oneOf) {
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

      loaders.push({
        test: /\.md$/,
        use: [
          {
            loader: require.resolve('raw-content-replace-loader'),
            options: {
              path: PATH.join(paths.catchDirPath, './md'), // 需要替换的目录
              replace: paths.projectPath, // 替换成目标目录
              sep: /___/g,               // 文件名存储，文件夹+下划线间隔+文件名
            }
          }
        ]
      })

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

      item.oneOf = loaders.concat(item.oneOf);
    }
    return item;
  })


  config.plugins = config.plugins.concat([
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.defaultHTMLPath,
    }),
    new CopyMarkdownImageWebpackPlugin({
      dir: cmd.markdownPaths,
      toDir: config.output.path,
    }),
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
  ])

  return config;
}
