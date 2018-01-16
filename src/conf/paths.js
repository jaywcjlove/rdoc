const PATH = require('path');
const FS = require('fs');

// 确保在项目文件夹中的任何符号都解决了：
const appDirectory = FS.realpathSync(process.cwd());
const toolDirectory = FS.realpathSync(__dirname);
// Markdown 所在目录
const resolveApp = relativePath => PATH.resolve(appDirectory, relativePath);
// rdoc 工具所在目录
const resolveTool = relativePath => PATH.resolve(toolDirectory, relativePath);

let appPackage = resolveApp('./package.json');
appPackage = require(appPackage);

// favicon
const faviconPath = () => {
  if (appPackage.rdoc && appPackage.rdoc.favicon
    && FS.existsSync(PATH.resolve(appDirectory, appPackage.rdoc.favicon))) {
    return PATH.resolve(appDirectory, appPackage.rdoc.favicon);
  } else if (FS.existsSync(PATH.resolve(appDirectory, './favicon.ico'))) {
    return PATH.resolve(appDirectory, './favicon.ico')
  }
  return resolveTool('../../theme/default/favicon.ico');
}

// get logo
const logoPath = () => {
  if (appPackage.rdoc && appPackage.rdoc.logo
    && FS.existsSync(PATH.resolve(appDirectory, appPackage.rdoc.logo))){
    return PATH.resolve(appDirectory, appPackage.rdoc.logo);
  } else if (FS.existsSync(PATH.resolve(appDirectory, './logo.svg'))) {
    return PATH.resolve(appDirectory, './logo.svg')
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
  defaultNodeModules: resolveTool('node_modules'),
  defaultTemplatePath: resolveTool('../../templates/default'),
  defaultFaviconPath: faviconPath(),
  defaultHTMLPath: resolveTool('../../theme/default/index.html'),
  appIndexJs: resolveTool('../web/index.js'),
  appDir: resolveTool('../web'),
};
