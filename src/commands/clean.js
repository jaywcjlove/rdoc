const FS = require('fs-extra');
const paths = require('../conf/paths')

module.exports = function (params) {
  if (params.clean && FS.pathExistsSync(paths.catchDirPath)) {
    // 清空目录
    FS.emptyDirSync(paths.catchDirPath);
  }
}
