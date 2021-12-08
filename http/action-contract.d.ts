import {
  Payload,
  RetrieveResult,
  QueryResult,
  FlistFilters,
  PlistFilters,
  SlistFilters,
  ActionConclusion,
} from '../transactions';
import { Artifacts } from '../artifacts';
import { RequestAbortHandlerAbstract } from '../transactions';

declare class ActionContract {
  public store(
    accessToken: null | string,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    payload: Payload
  ): Promise<ActionConclusion>;

  public update(
    accessToken: null | string,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    uuid: string,
    payload: Payload
  ): Promise<ActionConclusion>;

  public flistQuery(
    accessToken: null | string,
    role: null | string,
    repository: string,
    list: string,
    filters: null | FlistFilters,
    variant: null | string,
    requestAbortHandler: RequestAbortHandlerAbstract
  ): Promise<QueryResult>;

  public plistQuery(
    accessToken: null | string,
    role: null | string,
    repository: string,
    list: string,
    filters: null | PlistFilters,
    requestAbortHandler: RequestAbortHandlerAbstract
  ): Promise<QueryResult>;

  public slistQuery(
    accessToken: null | string,
    role: null | string,
    repository: string,
    list: string,
    filters: null | SlistFilters,
    requestAbortHandler: RequestAbortHandlerAbstract
  ): Promise<QueryResult>;

  public retrieve(
    accessToken: null | string,
    role: null | string,
    repository: string,
    uuid: string,
    variant: null | string,
    requestAbortHandler: RequestAbortHandlerAbstract
  ): Promise<RetrieveResult>;

  public remove(
    accessToken: null | string,
    role: null | string,
    repository: string,
    uuid: string
  ): Promise<ActionConclusion>;

  public auth(artifacts: Artifacts, repository: string, strategy: string, payload: Payload): Promise<ActionConclusion>;

  public deauth(): Promise<void>;

  public task(
    accessToken: null | string,
    artifacts: Artifacts,
    role: null | string,
    repository: string,
    task: string,
    payload: Payload
  ): Promise<ActionConclusion>;

  public call(input: RequestInfo, init?: RequestInit): Promise<Response>;
}

export { ActionContract };
