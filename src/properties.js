const {getArgumentOrDefault, getArgument, arguments} = require('./arguments');
const errorCodes = require("./errorCodes");

const properties = {
  localHtml: {
    required: true,
    arg: 0,
    defaultValue: null,
    expectedType: 'string',
    description: 'Location on machine where html is located'
  },
  savePath: {
    required: true,
    arg: 1,
    defaultValue: null,
    expectedType: 'string',
    description: 'Location on machine where to save file',
  },
  marginsType: {
    defaultValue: 0,
    expectedType: 'number',
    description: 'Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. and width in microns.',
  },
  scaleFactor: {
    defaultValue: 60,
    expectedType: 'number',
    description: 'The scale factor of the web page. Can range from 0 to 100.',
  },
  pageSize: {
    defaultValue: 'A4',
    expectedType: 'string',
    description: 'Specify page size of the generated PDF. Can be A3, A4, A5, Legal, Letter, Tabloid or an Object containing height',
  },
  printBackground: {
    defaultValue: true,
    expectedType: 'boolean',
    description: 'Whether to print CSS backgrounds.',
  },
  printSelectionOnly: {
    defaultValue: false,
    expectedType: 'boolean',
    description: 'Whether to print selection only.',
  },
  landscape: {
    defaultValue: false,
    expectedType: 'boolean',
    description: 'true for landscape, false for portrait.',
  },
};

const setDefaultValues = () => {
  if (getArgumentOrDefault('help', false, 'boolean')) {
    return;
  }

  for (const propertyName of Object.keys(properties)) {
    const prop = properties[propertyName];

    // make sure that required values are set
    if (prop.arg !== undefined) {
      prop.value = _getArgumentAtLocation(prop.arg);
      continue;
    }

    properties[propertyName].value = getArgumentOrDefault(propertyName, prop.defaultValue, prop.expectedType);
  }

  _ensureRequiredPropertiesAreSet();
}

const _getArgumentAtLocation = (argIndex) => {
  const argValue = arguments[argIndex];
  if (argValue && argValue.toString().includes('='))
    return null;
  return argValue;
};

const _ensureRequiredPropertiesAreSet = () => {
  for (const propertyName in properties) {
    const prop = properties[propertyName];

    if (!prop) {
      console.log('ERROR!!')
      console.log(`Strange error but parameter '${propertyName}' does not exists`);
      process.exit(errorCodes.internalError.code);
      return;
    }

    if (prop.required && !prop.value) {
      console.log('ERROR!!')
      console.log(`Parameter '${propertyName}' is required (type=${prop.expectedType})`);
      process.exit(errorCodes.requiredParameterMissing.code);
      return;
    }
  }
}

const printHelpDescriptions = () => {
  console.log('Use this properties:');
  for (const propertyName of Object.keys(properties)) {
    const prop = properties[propertyName];

    console.log(`${propertyName} - ${prop.description}`)
    console.log(`\t(defaultValue=${prop.defaultValue}, expectedType='${prop.expectedType}')`);
    console.log('');
  }

  console.log('');
  console.log('Response codes:');
  for(const errorCodeKey of Object.keys(errorCodes)) {
    const errorCode = errorCodes[errorCodeKey];
    console.log(`Code ${errorCode.code} for '${errorCode.description}'`)
  }
}

setDefaultValues();
module.exports = {
  properties,
  printHelpDescriptions,
};
