import { Lang, State, AppInfoInterface } from '@sotaoi/contracts/state';
import { AuthRecord } from '@sotaoi/contracts/artifacts';
import { StoreCreator, Store as ReduxStore } from '@sotaoi/contracts/definitions/redux';
import { InputValidatorContract } from '@sotaoi/contracts/http/input-validator-contract';
import { LocalMemoryContract } from '@sotaoi/contracts/http/local-memory-contract';

type StoreType = { getState: () => { [key: string]: any }; dispatch: any; subscribe: any } | ReduxStore;

declare abstract class StoreContract {
  protected appInfo: AppInfoInterface;
  protected apiUrl: string;
  protected createStore: StoreCreator;
  protected inputValidator: InputValidatorContract;
  protected localMemory: LocalMemoryContract;

  protected store: StoreType;
  protected initialState: State;

  constructor(
    appInfo: AppInfoInterface,
    apiUrl: string,
    createStore: StoreCreator,
    inputValidator: InputValidatorContract,
    localMemory: LocalMemoryContract
  );

  abstract init(): Promise<void>;
  abstract setAuthRecord(authRecord: null | AuthRecord, accessToken: null | string): Promise<void>;
  abstract setCurrentPath(currentPath: string): Promise<void>;
  abstract getCurrentPath(): string;
  abstract getAuthRecord(): null | AuthRecord;
  abstract getAccessToken(): null | string;
  abstract hasMultiLang(): boolean;
  abstract setTitle(title: string): void;
  abstract setSelectedLang(lang: Lang): void;
  abstract setDefaultLang(lang: Lang): void;
  abstract getSelectedLang(): Lang;
  abstract getDefaultLang(): Lang;
  abstract getAvailableLangs(): Lang[];
  abstract getTranslations(): { [key: string]: { [key: string]: string } };
  abstract subscribe(callback: () => void): () => void;
  abstract getState(): State;
  abstract getAppInfo(): AppInfoInterface;
  abstract getApiUrl(): string;
  abstract driverDomainSignature(): string;
  abstract mdriverDomainSignature(): string;
  abstract sdriverDomainSignature(): string;
}

export { StoreContract };
