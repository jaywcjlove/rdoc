const PATH = require('path');
const FS = require('fs');
const ghpages = require('gh-pages');
const loading = require('loading-cli');

module.exports = function server(cmd) {
  // 删除 .git 目录
  // rimraf.sync(PATH.join(cmd.output, '.git'));
  if (!FS.existsSync(cmd.output)) {
    console.log(`You need to run the ${`"npm run build"`.yellow} command.`);
    console.log(`The ${(cmd.output + '').red} folder does net exist!\n`);
    return;
  }

  console.log('  Start public to your git repo'.green)
  console.log(`  ${cmd.publish}\n`.green)
  const load = loading({
    "text": "Please wait ...".blue,
    "color": "blue",
    "interval": 100,
    "stream": process.stdout,
  }).start();

  ghpages.publish(cmd.output, {
    branch: cmd.branch,
    repo: cmd.publish,
    message: `Update website, ${new Date()}!`
  }, function name(err) {
    load.stop();
    if(err) {
      return console.log(err);
    }
    console.log(`\n  Push to ${cmd.branch} success!\n`.green.bold);
  });
}

