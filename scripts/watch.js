process.env.NODE_ENV = 'development';

require('dotenv').config({silent: true});

var webpack = require('webpack');
var config = require('../config/webpack.config.dev');
var chalk = require('chalk');
var clearConsole = require('react-dev-utils/clearConsole');

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

function removeHotLoaderDependencies(config) {
  var entry = config.entry;
  var plugins = config.plugins;
  
  entry = entry.filter(fileName => !fileName.match(/webpackHotDevClient/));
  plugins = plugins.filter(plugin => !(plugin instanceof webpack.HotModuleReplacementPlugin));

  config.entry = entry;
  config.plugins = plugins;

  return config;
}


function watch() {
  webpack(config).watch({}, (err, stats) => {
    clearConsole();

    if (err) {
      printErrors('Failed to compile.', [err]);
      return;
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      return;
    }

    console.log(chalk.green('Compiled successfully.'));
    console.log();
    console.log('Assets:')
    console.log();
    console.log(chalk.cyan(Object.keys(stats.compilation.assets).map(asset => `  ${asset}`).join('\n')));
    console.log();
    console.log(`Time started: ${stats.startTime}`);
    console.log(`Time completed: ${stats.endTime}`);
    console.log();
    console.log();
  });
}

removeHotLoaderDependencies(config);
watch();
