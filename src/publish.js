const PATH = require('path');
const gitP = require('simple-git');
const rimraf = require('rimraf');
const loading = require('loading-cli');

module.exports = function server(cmd) {

  rimraf.sync(PATH.join(cmd.output, '.git'))
  const git = gitP(cmd.output);

  console.log('  Start public to your git repo'.green)
  console.log(`  ${cmd.publish}\n`.green)
  loading({
    "text": "Please wait ...".blue,
    "color": "blue",
    "interval": 100,
    "stream": process.stdout,
  }).start();

  git.init()
    .add('./*')
    .commit(`Update website, ${new Date()}!`)
    .addRemote('origin', cmd.publish)
    .push(['-f', 'origin', cmd.branch],(err,message)=>{
      loading.stop();
      if (err) {
        console.log('error:'.red, err);
      } else {
        console.log(`\n  Push to ${cmd.branch} success!\n`.green.bold);
      }
    });

}

