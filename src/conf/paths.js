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
const faviconPath = () => {
  const _path = getCinfigFilePath('./favicon.ico', 'favicon');
  if (_path) return _path;
  return resolveTool('../../theme/default/favicon.ico');
}

// get logo
const logoPath = () => {
  const _path = getCinfigFilePath('./logo.svg','logo');
  if (_path) return _path;
  return false;
}

function getCinfigFilePath(fileName,type) {
  let appPackage = resolveApp('./package.json');
  if (FS.existsSync(appPackage)) {
    appPackage = require(appPackage);
    if (appPackage.rdoc && appPackage.rdoc[type]
      && FS.existsSync(PATH.resolve(appDirectory, appPackage.rdoc[type]))) {
      return PATH.resolve(appDirectory, appPackage.rdoc[type]);
    } else if (FS.existsSync(PATH.resolve(appDirectory, fileName))) {
      return PATH.resolve(appDirectory, fileName)
    }
  }
  return false;
}

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
  logoPath: logoPath(),
  // rdoc 工具所在目录
  rdocPackage: resolveTool('../../package.json'),
  defaultNodeModules: resolveTool('node_modules'),
  defaultTemplatePath: resolveTool('../../templates/default'),
  defaultFaviconPath: faviconPath(),
  defaultHTMLPath: resolveTool('../../theme/default/index.html'),
  appIndexJs: resolveTool('../web/index.js'),
  appDir: resolveTool('../web'),
};
