const PATH = require('path');
const FS = require('fs');
const gitP = require('simple-git');
const rimraf = require('rimraf');
const loading = require('loading-cli');

module.exports = function server(cmd) {
  // 删除 .git 目录
  rimraf.sync(PATH.join(cmd.output, '.git'));
  if (!FS.existsSync(cmd.output)) {
    console.log(`You need to run the ${`"npm run build"`.yellow} command.`);
    console.log(`The ${(cmd.output + '').red} folder does net exist!\n`);
    return;
    console.log('cmd.output:', cmd.output, FS.existsSync(cmd.output));
  }

  const git = gitP(cmd.output);
  console.log('  Start public to your git repo'.green)
  console.log(`  ${cmd.publish}\n`.green)
  const load = loading({
    "text": "Please wait ...".blue,
    "color": "blue",
    "interval": 100,
    "stream": process.stdout,
  }).start();

  git.init()
    .add('./*')
    .commit(`Update website, ${new Date()}!`)
    .addRemote('origin', cmd.publish)
    .push(['-f', 'origin', cmd.branch], (err, message) => {
      load.stop();
      if (err) {
        console.log('error:'.red, err);
      } else {
        console.log(`\n  Push to ${cmd.branch} success!\n`.green.bold);
      }
    });

}

