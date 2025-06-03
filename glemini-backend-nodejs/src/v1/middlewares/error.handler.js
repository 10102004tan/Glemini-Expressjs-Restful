"use strict";
const chalk = require('chalk');

function parseStackTrace(stack = '') {
  return stack
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('at'))
    .map(line => {
      const match = line.match(/at (async\s+)?([\w$.<>]+)? ?\(?(.+):(\d+):(\d+)\)?/);
      if (!match) return { raw: line };
      const [, isAsync, func, file, lineNum, colNum] = match;
      return {
        async: !!isAsync,
        function: func || '<anonymous>',
        file,
        line: Number(lineNum),
        column: Number(colNum),
      };
    });
}

const errorHandler = (err, req, res, next) => {
  if (err) {
    const stackFrames = parseStackTrace(err.stack);

    console.log(chalk.red.bold('❌ ERROR OCCURRED'));
    console.log(chalk.red('▶ Message:'), err.message || 'An unexpected error occurred');
    console.log(chalk.red('▶ Status Code:'), err.status || 500);
    console.log(chalk.red('▶ Request URL:'), req.originalUrl);

    console.log(chalk.red('▶ Stack Trace:'));
    err.message !== "unauthorized" && stackFrames.forEach((frame, index) => {
      if (frame.raw) {
        console.log(chalk.gray(`  ${index + 1}. ${frame.raw}`));
      } else {
        console.log(
          chalk.yellow(`  ${index + 1}.`) +
          chalk.cyan(` [${frame.function}]`) +
          ` at ${chalk.underline(frame.file)}:${chalk.magenta(frame.line)}:${chalk.magenta(frame.column)}`
        );
      }
    });

    res.status(err.status || 500).json({
      status: 'error',
      message: err.message || 'Internal Server Error',
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
