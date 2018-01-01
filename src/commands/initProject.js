const PATH = require('path');
const FS = require('fs-extra');
const copyTemplate = require('copy-template-dir');
const paths = require('../conf/paths');

module.exports = function (params) {

  const outDir = typeof params.init === 'string' ? PATH.join(paths.projectPath, params.init) : paths.projectPath;
  const projectName = PATH.basename(outDir);

  // 目录不存在生成目录
  if (!FS.pathExistsSync(outDir)) {
    FS.ensureDirSync(outDir);
  }

  // 目录不为空返回错误提示
  if (FS.readdirSync(PATH.join(outDir)).length > 0) {
    return console.log(`\n ${'initialization failed! '.red} ${outDir.yellow} ${'is not an empty directory.'.red}\n`);
  }

  // 复制模板
  if (FS.pathExistsSync(paths.defaultTemplatePath)) {
    copyTemplate(paths.defaultTemplatePath, outDir, {
      name: projectName
    }, (err, createdFiles) => {
      if (err) return console.log(`Copy Tamplate Error: ${err} !!!`.red);
      createdFiles.sort().forEach(createdFile => {
        console.log(`  ${'create'.green} ${createdFile.replace(paths.projectPath,'')}`)
      })

      console.log('\n  initialization finished!\n'.green)
      let cmdstr = `cd ${projectName} && npm start`.cyan;
      if (typeof params.init !== 'string') {
        cmdstr = 'npm start'.cyan;
      }
      console.log(`  Run the ${cmdstr} to start the website.\n\n`)
    })
  } else {
    return console.log(`Error: Directory ${paths.defaultTemplatePath} does not exist`.red);
  }
}
