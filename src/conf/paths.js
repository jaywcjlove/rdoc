const PATH = require('path');
const FS = require('fs');

// 确保在项目文件夹中的任何符号都解决了：
const appDirectory = FS.realpathSync(process.cwd());
const toolDirectory = FS.realpathSync(__dirname);
// Markdown 所在目录
const resolveApp = relativePath => PATH.resolve(appDirectory, relativePath);
// rdoc 工具所在目录
const resolveTool = relativePath => PATH.resolve(toolDirectory, relativePath);

// Get favicon path
const faviconPath = () => {
  const _path = getCinfigFilePath('./favicon.ico', 'favicon');
  if (_path) return _path;
  return resolveTool('../../theme/default/favicon.ico');
}

// Get logo path
const logoPath = () => {
  const _path = getCinfigFilePath('./logo.svg','logo');
  if (_path) return _path;
  return false;
}

// Get theme path
const getThemePath = () => {
  const _path = getCinfigFilePath('./default', 'theme');
  if (_path) return _path;
  return resolveTool('../../theme/default');
}

function getCinfigFilePath(fileName,type) {
  let appPackage = resolveApp('./package.json');
  if (FS.existsSync(appPackage)) {
    appPackage = require(appPackage);
    // 主题目录加载
    if (type === 'theme' && appPackage.rdoc) {
      if (!appPackage.rdoc[type]) appPackage.rdoc[type] = fileName;
      const _path = PATH.resolve(appDirectory, 'theme', appPackage.rdoc[type]);
      const _NodeModulesPath = PATH.resolve(appDirectory, 'node_modules', appPackage.rdoc[type]);
      if (FS.existsSync(_path)){
        return _path;
      } else if (FS.existsSync(_NodeModulesPath)) {
        return _NodeModulesPath;
      }
      return false;
    }
    // 其它文件加载，如：logo.svg，favicon.ico
    if (appPackage.rdoc && appPackage.rdoc[type] && FS.existsSync(PATH.resolve(appDirectory, appPackage.rdoc[type]))) {
      return PATH.resolve(appDirectory, appPackage.rdoc[type]);
    } else if (FS.existsSync(PATH.resolve(appDirectory, fileName))) {
      return PATH.resolve(appDirectory, fileName)
    }
  }
  return false;
}


const modPath = resolveTool('../../node_modules');
function getExcludeFoldersRegExp() {
  if (!FS.existsSync(modPath)) return [];
  let regxExc = FS.readdirSync(modPath);
  regxExc = regxExc.filter(item => item !== 'rdoc');
  regxExc = regxExc.map(item => {
    let rgxPath = 'node_modules' + PATH.sep + item;
    if (PATH.sep === '\\') {
      rgxPath = 'node_modules\\' + PATH.sep + item;
    }
    return new RegExp(rgxPath);
  });
  return regxExc;
}

module.exports = {
  // Markdown 所在目录
  appThemePath: getThemePath(),
  appPackage: resolveApp('./package.json'),
  appNodeModules: resolveApp('node_modules'),
  appBuildDist: resolveApp('.rdoc-dist'),
  catchDirPath: resolveApp('.cache'),
  docTreePath: resolveApp('.cache/.reactdoc.tree.json'),
  watchFilePath: resolveApp('.cache/watch-dir.js'),
  projectPath: appDirectory,
  publicPath: '/',
  logoPath: logoPath(),
  // rdoc 工具所在目录
  getExcludeFoldersRegExp: getExcludeFoldersRegExp(),
  rdocPackage: resolveTool('../../package.json'),
  defaultNodeModules: modPath,
  defaultTemplatePath: resolveTool('../../templates/default'),
  defaultFaviconPath: faviconPath(),
  defaultHTMLPath: resolveTool('../../theme/default/index.html'),
  appIndexJs: resolveTool('../web/index.js'),
  appDir: resolveTool('../web'),
};
