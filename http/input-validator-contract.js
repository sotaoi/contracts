class InputValidator {
  getResult(getInput) {
    throw new Error('InputValidator has missing "getResult" implementation');
  }

  setErrorResult(getInput) {
    throw new Error('InputValidator has missing "setErrorResult" implementation');
  }

  getErrors(getInput) {
    throw new Error('InputValidator has missing "getErrors" implementation');
  }

  getApiErrors(getInput) {
    throw new Error('InputValidator has missing "getApiErrors" implementation');
  }

  getAllApiErrors(getInput) {
    throw new Error('InputValidator has missing "getAllApiErrors" implementation');
  }

  async validate(getInput) {
    throw new Error('InputValidator has missing "validate" implementation');
  }

  async validateCollection(getInput) {
    throw new Error('InputValidator has missing "validateCollection" implementation');
  }

  async validateCollections(getInput) {
    throw new Error('InputValidator has missing "validateCollections" implementation');
  }

  async validatePayload(getInput) {
    throw new Error('InputValidator has missing "validatePayload" implementation');
  }

  getFormValidation(getInput) {
    throw new Error('InputValidator has missing "getFormValidation" implementation');
  }

  constructor(config, mdb, requester) {
    if ((!mdb() && !requester) || (!!mdb() && !!requester)) {
      throw new Error('failed to initialize input validator');
    }
    this.config = config;
    this.mdb = mdb;
    this.requester = requester;
    this.formValidation = null;
    this.errorTitle = null;
    this.errorMsg = null;
    this.errorMessages = {};
    this.apiErrorMessages = {};
    this.apiErrorXdata = {};
  }

  isValid() {
    for (const errorMessages of Object.values(this.errorMessages)) {
      if (!errorMessages.length) {
        continue;
      }
      return false;
    }
    return true;
  }
}

InputValidator.DEFALUT_ERROR_MSG = 'Field validation failed for method "%s"';

module.exports = { InputValidator };
