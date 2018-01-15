#!/usr/bin/env node
const FS = require('fs-extra');
const PATH = require('path');
const program = require('commander');
const color = require('colors-cli/toxic');
const initProject = require('../src/commands/initProject');
const clean = require('../src/commands/clean');
const initCatch = require('../src/utils/initCatch');
const Servers = require('../src/server');
const Build = require('../src/build');
const Publish = require('../src/publish');
const paths = require('../src/conf/paths');

program
  .description('Fast static site generator for React.')
  .option('-i, init [path]', 'Create an empty website or reinitialize an existing one.')
  .option('-d, --doc <path>', 'Other documents generated.')
  .option('-o, --output <path>', 'Writes the compiled file to the disk directory.', 'dist')
  .option('-p, --port [number]', 'The port.', 5858)
  .option('-h, --host [host]', 'The host.', '0.0.0.0')
  .option('-b, --branch <branch>', 'Name of the branch you are pushing to.', 'gh-pages')
  .option('--publish [url]', 'Other documents generated.')
  .option('--build', 'Creating an optimized production build.')
  .option('--clean', 'Delete the .cache folder.')
  .on('--help', function () {
    console.log('\n  Examples:');
    console.log();
    console.log('    $ rdoc init');
    console.log('    $ rdoc init doc-example');
    console.log('    $ rdoc -d doc/mm');
    console.log('    $ rdoc -d tutorial,doc');
    console.log('    $ rdoc -d tutorial,doc --clean --build');
    console.log('    $ rdoc -p 2323  -d doc --clean');
    console.log('    $ rdoc -h 0.0.0.0 -d doc --clean');
    console.log('    $ rdoc --publish https://git_repo.git --branch master');
    console.log();
  })
  .parse(process.argv);
// rdoc 工具根目录
// program.rdocPath = PATH.join(__dirname, '../');
// 所有 Markdown 目录
program.markdownPaths = [];
// 网站根目录
program.projectPath = process.cwd();
// 编译输出目录
program.output = PATH.join(program.projectPath, program.output);

// 网站根目录,指定的所有 Markdown 的目录
if (program.doc) {
  program.doc.split(',').forEach((itemPath) => program.markdownPaths.push(PATH.join(program.projectPath, itemPath)));
}

if (program.clean) clean(program);
if (program.init) return initProject(program);

// 将生成的代码，push到指定仓库，已经分支。
if (program.publish) {
  return Publish(program)
}

// 没有指定，文档目录
if (program.markdownPaths.length === 0) return console.log(`Please specify the directory with the parameters "-d".`.red)

let isExists = true;
// 判断指定文件夹是否存
program.markdownPaths.forEach((item) => {
  if (!FS.existsSync(item)) {
    console.log(`Error: Directory ${item.yellow} does not exist`.red)
    isExists = false;
  }
})

if (isExists) {
  FS.ensureDirSync(paths.catchDirPath);
  initCatch(program, () => {
    if (program.build) {
      Build(program);
    } else {
      Servers(program);
    }
  })
}
