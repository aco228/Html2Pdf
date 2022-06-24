const errorCodes = {
  success: {
    code: 0,
    description: 'Success',
  },
  internalError: {
    code: 1,
    description: 'Internal error',
  },
  requiredParameterMissing: {
    code: 2,
    description: 'Required parameter missing',
  }
};

module.exports = errorCodes;
