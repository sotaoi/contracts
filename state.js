class State {
  'app.meta.title';
  'app.credentials.authRecord';
  'app.coreState.maintenance';
  'app.lang.selected';
  'app.lang.default';
  'app.lang.available';
  'app.lang.translations';
}

class Lang {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

class Seed {
  constructor(seed) {
    if (typeof seed !== 'object' || !seed) {
      throw new Error('Seed argument is invalid');
    }
    // if (
    //   typeof seed['app.lang.selected'] !== 'object' ||
    //   !seed['app.lang.selected'] ||
    //   typeof seed['app.lang.selected'].name !== 'string' ||
    //   typeof seed['app.lang.selected'].code !== 'string'
    // ) {
    //   throw new Error('Seed argument has invalid "lang.selected" prop');
    // }
    // if (
    //   typeof seed['app.lang.default'] !== 'object' ||
    //   !seed['app.lang.default'] ||
    //   typeof seed['app.lang.default'].name !== 'string' ||
    //   typeof seed['app.lang.default'].code !== 'string'
    // ) {
    //   throw new Error('Seed argument has invalid "lang.default" prop');
    // }
    // // ...

    this['app.meta.title'] = seed['app.meta.title'] || null;
    this['app.credentials.accessToken'] = seed['app.credentials.accessToken'] || null;
    this['app.credentials.authRecord'] = seed['app.credentials.authRecord'] || null;
    this['app.coreState.maintenance'] = !!seed['app.coreState.maintenance'];
    this['app.lang.selected'] = seed['app.lang.selected'];
    this['app.lang.default'] = seed['app.lang.default'];
    this['app.lang.available'] = seed['app.lang.available'];
    this['app.lang.translations'] = seed['app.lang.translations'];
  }
}

class AppPocket {
  constructor(appPocket, appInfo) {
    appPocket = JSON.parse(JSON.stringify(appPocket || {}));
    const defaultAppPocket = AppPocket.getDefaultAppPocket(appInfo);
    this.bundleState = {
      bundleUid:
        typeof appPocket?.bundleState?.bundleUid === 'string'
          ? appPocket.bundleState.bundleUid
          : defaultAppPocket.bundleState.bundleUid,
      isMasterBundle:
        typeof appPocket?.bundleState?.isMasterBundle === 'boolean'
          ? appPocket.bundleState.isMasterBundle
          : defaultAppPocket.bundleState.isMasterBundle,
    };
    this.coreState = {
      appMaintenance:
        typeof appPocket?.coreState?.appMaintenance === 'boolean'
          ? appPocket.coreState.appMaintenance
          : defaultAppPocket.coreState.appMaintenance,
    };
  }

  toObject() {
    return {
      bundleState: this.bundleState,
      coreState: this.coreState,
    };
  }

  static getDefaultAppPocket(appInfo) {
    return {
      bundleState: {
        bundleUid: appInfo.bundleUid,
        isMasterBundle: appInfo.isMasterBundle === 'yes',
      },
      coreState: {
        appMaintenance: false,
      },
    };
  }
}

module.exports = { AppPocket, State, Lang, Seed };
