import { StoreContract } from './store-contract';

declare abstract class Lang {
  abstract init(store: () => StoreContract): Promise<void>;
  abstract isMultilang(): boolean;
  abstract useTranslation<UseTranslationResponse>(): UseTranslationResponse;
}

export { Lang };
