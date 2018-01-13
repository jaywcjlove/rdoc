const paths = require('./paths');
const autoprefixer = require('autoprefixer');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');

module.exports = {
  entry: {},
  output: {
    path: paths.appBuild,
    publicPath: paths.publicPath,
    chunkFilename: 'js/[hash:8].[name].js',
  },
  module: {
    strictExportPresence: true,
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /\.(cache)/],
        enforce: 'pre',
        use: [
          // TODO:禁用require.ensure也不是一种标准的语言特征。
          // 我们等待https://github.com/facebookincubator/create-react-app/issues/2176。
          // { parser: { requireEnsure: false } },
          {
            // 首先运行linter。
            // 在Babel处理js之前做这一点很重要。
            // options: {
            //   formatter: eslintFormatter,
            //   eslintPath: require.resolve('eslint'),
            // },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        // “oneOf”将遍历所有以下加载程序，直到一个符合要求。
        // 当没有加载器匹配时，它将返回到加载程序列表末尾的“file”加载器。
        oneOf: [
          {
            test: /\.(svg|png|bmp|jpg|jpeg|gif)$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'img/[name].[hash:8].[ext]',
            },
          },
          // “postcss-loader”将autoprefixer应用到我们的CSS中。
          // “css-loader”可以解析CSS中的路径，并添加资源作为依赖关系。
          // “style-loader”将CSS转换为注入<style>标签的JS模块。
          // 在生产中，我们使用一个插件将该CSS提取到一个文件，但是
          // 在开发中“style-loader”可以对CSS进行热编辑。
          {
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
                    PostcssFlexbugsFixes,
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
          },
          {
            test: /\.md$/,
            loader: require.resolve('raw-extend-loader'),
          },
          // “file-loader”确保这些资源由WebpackDevServer服务。
          // 当您导入资源时，您将获得（虚拟）文件名。
          // 在生产中，它们将被复制到`build`文件夹。
          // 此加载程序不使用“test”，因此它将捕获所有模块
          {
            // 排除`js`文件以保持“css”加载器工作，因为它注入它的运行时，否则将通过“文件”加载器处理。
            // 还可以排除“html”和“json”扩展名，以便它们被webpacks内部加载器处理。
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/[name].[hash:8].[ext]',
            },
          },
        ]
      },
    ]
  },
  plugins: [],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
}
