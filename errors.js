class ErrorException extends Error {
  constructor(code = 400, message = '') {
    super(message);
    this.code = code;
  }
}

//

class ResultIsCorruptError extends ErrorException {}
class NotFoundViewError extends ErrorException {}
class ComponentFailError extends ErrorException {}
class NotFoundLayoutError extends ErrorException {}
class InvalidGateRepositoryError extends ErrorException {}

//

const Errors = {
  ResultIsCorrupt: ResultIsCorruptError,
  NotFoundView: NotFoundViewError,
  ComponentFail: ComponentFailError,
  NotFoundLayout: NotFoundLayoutError,
  InvalidGateRepository: InvalidGateRepositoryError,
};

class ErrorCode {
  //
}
ErrorCode.APP_GENERIC_ERROR = 'app.generic.error';

module.exports = {
  ErrorException,
  Errors,
  ErrorCode,
  ResultIsCorruptError,
  NotFoundViewError,
  ComponentFailError,
  NotFoundLayoutError,
  InvalidGateRepositoryError,
};
