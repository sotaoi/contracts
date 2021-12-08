import { Artifacts, AuthRecord, RecordEntry, Artifact, RecordRef } from './artifacts';
import { NotificationContract } from './http/notification-contract';

interface ScopedRequests {
  [key: string]: (data: { [key: string]: any }) => Promise<any>;
}

declare abstract class ResponseToolkit<ResponseObject> {
  abstract response: (value: any) => ResponseObject;
}
declare abstract class ResponseObjectAbstract<ResponseObject> {
  abstract code: (code: number) => ResponseObject;
}
declare class MsgResult<ResponseObject extends ResponseObjectAbstract<ResponseObject>> {
  public code: number;
  public errorCode: null | string;
  public title: string;
  public msg: string;
  public xdata: { [key: string]: any };

  constructor(code: number, errorCode: null | string, title: string, msg: string, xdata: { [key: string]: any });

  public output(handler: ResponseToolkit<ResponseObject>): Promise<ResponseObject>;
}

// C.R.A.Q.

declare class ErrorResult {
  public code: number;
  public errorCode: null | string;
  public msg: string;
  public title: string;
  public validations: null | { [key: string]: string[] };
  public xdata: { [key: string]: any };

  constructor(
    code: number,
    errorCode: null | string,
    title: string,
    msg: string,
    validations: null | { [key: string]: string[] },
    xdata: { [key: string]: any }
  );
}

declare class Command {
  public authRecord: null | AuthRecord;
  public artifacts: Artifacts;
  public role: null | string;
  public repository: string;

  constructor(authRecord: null | AuthRecord, artifacts: Artifacts, role: null | string, repository: string);
}

declare class CommandResult {
  public success: boolean;
  public code: number;
  public errorCode: null | string;
  public msg: string;
  public title: string;
  public artifact: null | Artifact;
  public validations: null | { [key: string]: string[] };
  public xdata: { [key: string]: any };

  constructor(
    code: number,
    errorCode: null | string,
    msg: string,
    title: string,
    artifact: null | Artifact,
    validations: null | { [key: string]: string[] },
    xdata: { [key: string]: any }
  );

  public getCode(): number;

  public getError(): ErrorResult;
}

declare class RetrieveResult {
  public success: boolean;
  public code: number;
  public errorCode: null | string;
  public title: string;
  public msg: string;
  public record: null | RecordEntry;
  public validations: null | { [key: string]: string[] };
  public xdata: { [key: string]: any };

  constructor(
    code: number,
    errorCode: null | string,
    title: string,
    msg: string,
    record: null | RecordEntry,
    validations: null | { [key: string]: string[] },
    xdata: { [key: string]: any }
  );
  public getCode(): number;
}

declare class AuthResult {
  public success: boolean;
  public code: number;
  public errorCode: null | string;
  public title: string;
  public msg: string;
  public authRecord: null | AuthRecord;
  public accessToken: null | string;
  public validations: null | { [key: string]: string[] };
  public xdata: { [key: string]: any };

  constructor(
    code: number,
    errorCode: null | string,
    title: string,
    msg: string,
    authRecord: null | AuthRecord,
    accessToken: null | string,
    validations: null | { [key: string]: string[] },
    xdata: { [key: string]: any }
  );

  public getCode(): number;

  public getError(): ErrorResult;
}

declare class TaskResult {
  public success: boolean;
  public code: number;
  public errorCode: null | string;
  public title: string;
  public msg: string;
  public data: null | { [key: string]: any };
  public validations: null | { [key: string]: string[] };
  public xdata: { [key: string]: any };

  constructor(
    code: number,
    errorCode: null | string,
    title: string,
    msg: string,
    data: null | { [key: string]: any },
    validations: null | { [key: string]: string[] },
    xdata: { [key: string]: any }
  );

  public getCode(): number;

  public getError(): ErrorResult;
}

declare class QueryResult {
  public success: boolean;
  public code: number;
  public errorCode: null | string;
  public title: string;
  public msg: string;
  public records: null | RecordEntry[];
  public validations: null | { [key: string]: string[] };
  public xdata: { [key: string]: any };

  constructor(
    code: number,
    errorCode: null | string,
    title: string,
    msg: string,
    records: null | RecordEntry[],
    validations: null | { [key: string]: string[] },
    xdata: { [key: string]: any }
  );

  public getCode(): number;
}

declare class Payload {
  public data: { [key: string]: null | string | Blob | Blob[] };

  constructor(data: { [key: string]: null | string | Blob | Blob[] });

  public getFormData(): FormData;
}

declare class Query<FilterType> extends Command {
  public type: 'flist' | 'plist' | 'slist';
  public list: string;
  public filters: FilterType;

  constructor(
    type: 'flist' | 'plist' | 'slist',
    authRecord: null | AuthRecord,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    list: string,
    filters: FilterType
  );
}

declare class Retrieve {
  public authRecord: null | AuthRecord;
  public role: null | string;
  public repository: string;
  public uuid: string;
  public variant: null | string;

  constructor(
    authRecord: null | AuthRecord,
    role: null | string,
    repository: string,
    uuid: string,
    variant?: null | string
  );
}

declare class FlistQuery extends Query<null | FlistFilters> {
  constructor(
    authRecord: null | AuthRecord,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    list: string,
    filters: null | FlistFilters,
    variant: null | string
  );
}

declare class PlistQuery extends Query<null | PlistFilters> {
  constructor(
    authRecord: null | AuthRecord,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    list: string,
    filters: null | PlistFilters,
    variant: null | string
  );
}

declare class SlistQuery extends Query<null | SlistFilters> {
  constructor(
    authRecord: null | AuthRecord,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    list: string,
    filters: null | SlistFilters,
    variant: null | string
  );
}

declare abstract class QueryFilters {
  //
}

declare class FlistFilters extends QueryFilters {
  where: { [key: string]: string | number };
  limit: number;

  constructor(where: { [key: string]: string | number }, limit: number);
}

declare class PlistFilters extends QueryFilters {
  where: { [key: string]: string | number };
  page: number;
  perPage: number;

  constructor(where: { [key: string]: string | number }, page: number, perPage: number);
}

declare class SlistFilters extends QueryFilters {
  where: { [key: string]: string | number };
  batchSize: number;

  constructor(where: { [key: string]: string | number }, batchSize: number);
}

//

declare abstract class RequestAbortHandlerAbstract {
  protected aborts: (() => void)[];

  constructor();

  abstract abort(): void;
  abstract register(abort: () => void): void;
  abstract clear(): void;
}

type RetrieveAction = (
  props: { [key: string]: any },
  requestAbortHandler: RequestAbortHandlerAbstract
) => Promise<RetrieveResult>;

type QueryAction = (
  props: { [key: string]: any },
  requestAbortHandler: RequestAbortHandlerAbstract
) => Promise<QueryResult>;

//

declare class ActionConclusion<T = any> {
  protected _result: CommandResult | AuthResult | TaskResult;
  protected notification: NotificationContract;
  protected pushRoute: (to: string, goTop?: boolean) => void;
  constructor(
    result: CommandResult | AuthResult | TaskResult,
    notification: NotificationContract,
    pushRoute: (to: string, goTop?: boolean) => void
  );
  public result(): CommandResult | AuthResult | TaskResult;
  public commandResult(): CommandResult;
  public authResult(): AuthResult;

  public taskResult(): TaskResult;

  public notify(nextRoute?: null | string): Promise<void>;
}

//

type ListenerEventTypes = 'db.records.updated' | 'db.records.removed';

declare const ListenerEventType: { [key: string]: { [key: string]: { [key: string]: ListenerEventTypes } } };

declare const ListenerEvent: (event: ListenerEventTypes, recordRef: RecordRef) => string;

//

export {
  Command,
  ErrorResult,
  MsgResult,
  CommandResult,
  RetrieveResult,
  QueryResult,
  AuthResult,
  TaskResult,
  Payload,
  Retrieve,
  FlistQuery,
  PlistQuery,
  SlistQuery,
  QueryFilters,
  FlistFilters,
  PlistFilters,
  SlistFilters,
  RequestAbortHandlerAbstract,
  ActionConclusion,
  ListenerEventType,
  ListenerEvent,
};
export type { ScopedRequests, RetrieveAction, QueryAction, ListenerEventTypes };
