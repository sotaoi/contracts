import { StoreContract } from '@sotaoi/contracts/http/store-contract';

declare abstract class LangContract {
  abstract init(store: () => StoreContract): Promise<void>;
  abstract isMultilang(): boolean;
  abstract useTranslation<UseTranslationResponse>(): UseTranslationResponse;
}

export { LangContract };
