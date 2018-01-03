
class WatchMissingNodeModulesPlugin {
  constructor(nodeModulesPath) {
    this.nodeModulesPath = nodeModulesPath;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      var missingDeps = compilation.missingDependencies;
      var nodeModulesPath = this.nodeModulesPath;

      if (this.nodeModulesPath && !Array.isArray(this.nodeModulesPath)){
        nodeModulesPath = [this.nodeModulesPath];
      }
      nodeModulesPath.forEach((nodeModulesPathItem) => {
        // If any missing files are expected to appear in node_modules...
        if (missingDeps.some(file => file.indexOf(nodeModulesPathItem) !== -1)) {
          // ...tell webpack to watch node_modules recursively until they appear.
          compilation.contextDependencies.push(nodeModulesPathItem);
        }
      })
      callback();
    });
  }
}

module.exports = WatchMissingNodeModulesPlugin;
