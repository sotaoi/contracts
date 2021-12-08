import type { ErrorResult } from '../transactions';
import type { DatabaseConnection } from '../definitions/mdriver';

type RequesterFn<FieldValidation = any> = (
  key: string,
  validations: FieldValidation[],
  args: { [key: string]: any }
) => Promise<string[]>;

interface InputValidatorConfig<BaseInput = any> {
  getInput?: (key: string) => void | null | BaseInput;
  t?: (key: string, ...args: any[]) => string;
  messages?: { [key: string]: { [key: string]: string } };
  defaultErrorMsg?: string;
}

interface InputValidationResult {
  valid: boolean;
  title: string;
  message: string;
  validations: { [key: string]: string[] };
}

declare abstract class InputValidatorContract<
  FormValidation = null,
  FormValidations = any,
  FieldValidation = any,
  CollectionInput = any,
  BaseInput = any
> {
  abstract getResult(): InputValidationResult;
  abstract setErrorResult(errorResult: ErrorResult): void;
  abstract getErrors(key: string): string[];
  abstract getApiErrors(key: string): string[];
  abstract getAllApiErrors(): { [key: string]: string[] };
  abstract validate(key: string, validations: FieldValidation[]): Promise<string[]>;
  abstract validateCollection(collectionInput: CollectionInput): Promise<string[]>;
  abstract validateCollections(payload: { [key: string]: any }, form: FormValidations, tlPrefix: string): Promise<void>;
  abstract validatePayload(
    payload: { [key: string]: any },
    form: FormValidations,
    tlPrefix: string,
    isUpdateCommand: boolean
  ): Promise<void>;

  abstract getFormValidation(
    getInput: (key: string) => void | null | BaseInput
  ): InputValidatorContract<(key: string) => void | null | BaseInput>;

  public static DEFALUT_ERROR_MSG: string;

  protected config: InputValidatorConfig;
  protected mdb: () => null | ((repository: string) => DatabaseConnection.QueryBuilder);
  protected requester: null | RequesterFn<FieldValidation>;
  protected formValidation: null | FormValidation;
  protected errorTitle: null | string;
  protected errorMsg: null | string;
  protected errorMessages: { [key: string]: string[] };
  protected apiErrorMessages: { [key: string]: string[] };
  protected apiErrorXdata: { [key: string]: any };

  constructor(
    config: InputValidatorConfig,
    mdb: () => null | ((repository: string) => DatabaseConnection.QueryBuilder),
    requester: null | RequesterFn<FieldValidation>
  );

  public isValid(): boolean;
}

export { InputValidatorContract };
export type { RequesterFn, InputValidatorConfig, InputValidationResult };
