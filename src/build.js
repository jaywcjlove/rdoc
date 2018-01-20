// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const PATH = require('path');
const webpack = require('webpack');
const loading = require('loading-cli');
const config = require('./conf/webpack.config.prod');
const formatWebpackMessages = require('webpack-hot-dev-clients/formatWebpackMessages');

module.exports = function serve(program) {
  const spinner = loading("Creating an optimized production build...").start();
  build(program).then(({ stats, warnings }) => {
    spinner.stop()
    if (warnings.length) {
      console.log('\nCompiled with warnings.\n'.yellow);
      console.log(warnings.join('\n\n'));
    } else {
      console.log('\nCompiled successfully.\n'.green);
    }
  })
};

// Create the production build and print the deployment instructions.
function build(program) {
  // console.log('Creating an optimized production build...');
  let compiler = webpack(config(program));
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (process.env.CI && messages.warnings.length) {
        console.log(
          (
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          ).yellow
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });

}
