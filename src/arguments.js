const errorCodes = require("./errorCodes");
const arguments = process.argv.slice(2);
const parsedArguments = [];

const parseArguments = () => {
  for (const arg of arguments) {
    const argSplit = arg.split('=');

    if (argSplit.length === 1) {
      // probably bool
      parsedArguments.push({
        name: argSplit[0],
        value: true,
      });

      continue;
    }

    parsedArguments.push({
      name: argSplit[0],
      value: argSplit[1],
    });
  }
};

const getArgument = (name) => {
  return parsedArguments.find((arg) => arg.name === name);
};

const getArgumentOrDefault = (name, defaultValue, expectedType) => {
  const arg = getArgument(name);
  if (arg && typeof arg.value === expectedType) {
    return arg.value;
  }

  return defaultValue;
};

try {
  parseArguments();
}
catch (e) {
  console.log('Argument parsing error');
  console.log(e);
  process.exit(errorCodes.internalError.code);
}

module.exports = {
  arguments,
  parsedArguments,
  getArgument,
  getArgumentOrDefault,
}
