const isRoot = require('is-root');
const color = require('colors-cli');
const inquirer = require('inquirer');
const detect = require('detect-port-alt');
const clearConsole = require('./clearConsole');
const getProcessForPort = require('./getProcessForPort');
const isInteractive = process.stdout.isTTY;

module.exports = function choosePort(host, defaultPort) {
  return detect(defaultPort, host).then(
    port =>
      new Promise(resolve => {
        if (port === defaultPort) {
          return resolve(port);
        }
        const message =
          process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
            ? `Admin permissions are required to run a server on a port below 1024.`
            : `Something is already running on port ${defaultPort}.`;
        if (isInteractive) {
          clearConsole();
          const existingProcess = getProcessForPort(defaultPort);
          const question = {
            type: 'confirm',
            name: 'shouldChangePort',
            message:
              color.yellow(
                message +
                `${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`
              ) + '\n\nWould you like to run the app on another port instead?',
            default: true,
          };
          inquirer.prompt(question).then(answer => {
            if (answer.shouldChangePort) {
              resolve(port);
            } else {
              resolve(null);
            }
          });
        } else {
          console.log(color.red(message));
          resolve(null);
        }
      }),
    err => {
      throw new Error(
        color.red(`Could not find an open port at ${color.bold(host)}.`) +
        '\n' +
        ('Network error message: ' + err.message || err) +
        '\n'
      );
    }
  );
}
