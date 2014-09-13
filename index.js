'use strict';

var mapSeries = require('promise-map-series')
var mkdirp = require('mkdirp')
var path = require('path')
var includePathSearcher = require('include-path-searcher')
var Promise = require('rsvp').Promise;
var spawn = require('win-spawn');
var quickTemp = require('quick-temp')

function LivingStyleGuideCompiler(sourceTrees, inputFile, outputFile, options) {
  if (!(this instanceof LivingStyleGuideCompiler)) {
    return new LivingStyleGuideCompiler(sourceTrees, inputFile, outputFile, options);
  }

  this.sourceTrees = sourceTrees;
  this.inputFile = inputFile;
  this.outputFile = outputFile;
  options = options || {};
}

LivingStyleGuideCompiler.prototype.read = function(readTree) {
  var self = this;

  quickTemp.makeOrRemake(this, 'tmpDestDir')
  var destFile = this.tmpDestDir + '/' + this.outputFile;
  mkdirp.sync(path.dirname(destFile));

  return mapSeries(this.sourceTrees, readTree)
    .then(function (includePaths) {
      return new Promise(function(resolve, reject) {
        var srcFile = includePathSearcher.findFileSync(self.inputFile, includePaths);
        var exec = ['bundle', 'exec', 'livingstyleguide', 'compile', srcFile, destFile];
        console.log(exec.join(' '))
        var cmd = exec.shift();
        var cp = spawn(cmd, exec);

        cp.on('error', function(error) {
          console.error('[broccoli-livingstyleguide] ' + error);
          reject(err);
        });

        cp.on('close', function(code) {
          if (code > 0) {
            reject('broccoli-livingstyleguide exited with error code ' + code);
          }
          resolve(self.tmpDestDir);
        });

        return self.tmpDestDir;
      });
    });
}

LivingStyleGuideCompiler.prototype.cleanup = function () {
  quickTemp.remove(this, 'tmpDestDir');
}

module.exports = LivingStyleGuideCompiler;
