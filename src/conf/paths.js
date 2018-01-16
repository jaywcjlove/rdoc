const PATH = require('path');
const FS = require('fs');

// 确保在项目文件夹中的任何符号都解决了：
const appDirectory = FS.realpathSync(process.cwd());
const toolDirectory = FS.realpathSync(__dirname);
// Markdown 所在目录
const resolveApp = relativePath => PATH.resolve(appDirectory, relativePath);
// rdoc 工具所在目录
const resolveTool = relativePath => PATH.resolve(toolDirectory, relativePath);

// favicon
const faviconPath = () => FS.existsSync(PATH.resolve(appDirectory, './favicon.ico'))
    ? PATH.resolve(appDirectory, './favicon.ico')
    : resolveTool('../../theme/default/favicon.ico');

module.exports = {
  // Markdown 所在目录
  appPackage: resolveApp('./package.json'),
  appNodeModules: resolveApp('node_modules'),
  appBuild: resolveApp('dist'),
  catchDirPath: resolveApp('.cache'),
  docTreePath: resolveApp('.cache/.reactdoc.tree.json'),
  watchFilePath: resolveApp('.cache/watch-dir.js'),
  projectPath: appDirectory,
  publicPath: '/',
  // rdoc 工具所在目录
  defaultNodeModules: resolveTool('node_modules'),
  defaultTemplatePath: resolveTool('../../templates/default'),
  defaultFaviconPath: faviconPath(),
  defaultHTMLPath: resolveTool('../../theme/default/index.html'),
  appIndexJs: resolveTool('../web/index.js'),
  appDir: resolveTool('../web'),
};
