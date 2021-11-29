class Lang {
  async init(store) {
    throw new Error('InputValidator has missing "init" implementation');
  }
  isMultilang() {
    throw new Error('InputValidator has missing "isMultilang" implementation');
  }
  useTranslation() {
    throw new Error('InputValidator has missing "useTranslation" implementation');
  }
}

module.exports = { Lang };
