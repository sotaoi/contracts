declare class ErrorException extends Error {
  public code: number;

  constructor(code?: number, message?: string);
}

//

declare class ResultIsCorruptError extends ErrorException {}
declare class NotFoundViewError extends ErrorException {}
declare class ComponentFailError extends ErrorException {}
declare class NotFoundLayoutError extends ErrorException {}
declare class InvalidGateRepositoryError extends ErrorException {}

//

declare const Errors: {
  ResultIsCorrupt: typeof ResultIsCorruptError;
  NotFoundView: typeof NotFoundViewError;
  ComponentFail: typeof ComponentFailError;
  NotFoundLayout: typeof NotFoundLayoutError;
  InvalidGateRepository: typeof InvalidGateRepositoryError;
  [key: string]: typeof ErrorException;
};

declare class ErrorCode {
  public static APP_GENERIC_ERROR: string;
}

export {
  ErrorException,
  Errors,
  ErrorCode,
  ResultIsCorruptError,
  NotFoundViewError,
  ComponentFailError,
  NotFoundLayoutError,
  InvalidGateRepositoryError,
};
