class StoreContract {
  constructor(appInfo, apiUrl, createStore, inputValidator, localMemory) {
    this.appInfo = appInfo;
    this.apiUrl = apiUrl;
    this.createStore = createStore;
    this.inputValidator = inputValidator;
    this.localMemory = localMemory;
    this.store = {
      getState: () => () => ({}),
      dispatch: () => () => undefined,
      subscribe: () => () => undefined,
    };
    this.initialState = {
      'app.meta.title': '',
      'app.credentials.authRecord': null,
      'app.coreState.maintenance': false,
      'app.lang.selected': { code: 'en', name: 'English' },
      'app.lang.default': { code: 'en', name: 'English' },
      'app.lang.available': [{ code: 'en', name: 'English' }],
      'app.lang.translations': {},
    };
  }

  async init() {
    throw new Error('StoreContract has missing "init" implementation');
  }
  async setAuthRecord(authRecord, accessToken) {
    throw new Error('StoreContract has missing "setAuthRecord" implementation');
  }
  async setCurrentPath(currentPath) {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getCurrentPath() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getAuthRecord() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getAccessToken() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  hasMultiLang() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  setTitle(title) {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  setSelectedLang(lang) {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  setDefaultLang(lang) {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getSelectedLang() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getDefaultLang() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getAvailableLangs() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getTranslations() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getState() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getAppInfo() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  getApiUrl() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  driverDomainSignature() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  mdriverDomainSignature() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
  sdriverDomainSignature() {
    throw new Error('StoreContract has missing "setCurrentPath" implementation');
  }
}

module.exports = { StoreContract };
