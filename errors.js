class ErrorException extends Error {
  constructor(code = 400, message = '') {
    super(message);
    this.code = code;
  }
}

const Errors = {
  ResultIsCorrupt: class ResultIsCorruptError extends ErrorException {},
  NotFoundView: class NotFoundViewError extends ErrorException {},
  ComponentFail: class ComponentFailError extends ErrorException {},
  NotFoundLayout: class NotFoundLayoutError extends ErrorException {},
  InvalidGateRepository: class InvalidGateRepositoryError extends ErrorException {},
};

class ErrorCode {
  //
}
ErrorCode.APP_GENERIC_ERROR = 'app.generic.error';

module.exports = { ErrorException, Errors, ErrorCode };
