const PATH = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CreateSpareWebpackPlugin = require('create-spare-webpack-plugin');
const CopyMarkdownImageWebpackPlugin = require('copy-markdown-image-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');
const config = require('./webpack.config');

// 注意：在这里定义，因为它将被使用不止一次。
const cssFilename = 'css/[name].[contenthash:8].css';

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

      loaders.push(
        // “postcss-loader”将autoprefixer应用到我们的CSS中。
        // “css-loader”可以解析CSS中的路径，并添加资源作为依赖关系。
        // “style-loader”将CSS转换为注入<style>标签的JS模块。
        // 在生产中，我们使用一个插件将该CSS提取到一个文件，但是
        // 在开发中“style-loader”可以对CSS进行热编辑。
        {
          test: /\.(css|less)$/,
          loader: ExtractTextPlugin.extract(
            Object.assign(
              {
                fallback: require.resolve('style-loader'),
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      modules: true,
                      minimize: true,
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
              }
            )
          ),
        }
      )

      item.oneOf = loaders.concat(item.oneOf);
    }
    return item;
  })


  config.plugins = config.plugins.concat([
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.defaultHTMLPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
    }),
    // 注意：如果在“loader”中没有ExtractTextPlugin.extract（..），这将不起作用。
    new ExtractTextPlugin({
      filename: cssFilename,
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
