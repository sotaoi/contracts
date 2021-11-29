declare class ErrorException extends Error {
  public code: number;

  constructor(code?: number, message?: string);
}

declare const Errors: { [key: string]: typeof ErrorException };

declare class ErrorCode {
  public static APP_GENERIC_ERROR: string;
}

export { ErrorException, Errors, ErrorCode };
