import React from 'react';
import { AuthRecord } from '@sotaoi/contracts/artifacts';

interface AppInfoInterface {
  [key: string]: string;
  bundleUid: string;
  isMasterBundle: string;
}

declare class State {
  public 'app.meta.title': string;
  public 'app.credentials.authRecord': null | AuthRecord;
  public 'app.coreState.maintenance': boolean;
  public 'app.lang.selected': Lang;
  public 'app.lang.default': Lang;
  public 'app.lang.available': Lang[];
  public 'app.lang.translations': { [key: string]: { [key: string]: string } };
}

declare class Lang {
  public name: string;
  public code: string;

  constructor(name: string, code: string);
}

declare class Seed {
  public 'app.meta.title': string;
  public 'app.credentials.accessToken': null | string;
  public 'app.credentials.authRecord': null | AuthRecord;
  public 'app.coreState.maintenance': boolean;
  public 'app.lang.selected': Lang;
  public 'app.lang.default': Lang;
  public 'app.lang.available': Lang[];
  public 'app.lang.translations': { [key: string]: { [key: string]: string } };
}

interface AppPocketInterface {
  bundleState: {
    bundleUid: string;
    isMasterBundle: boolean;
  };
  coreState: {
    appMaintenance: boolean;
  };
}
declare class AppPocket implements AppPocketInterface {
  public bundleState: {
    bundleUid: string;
    isMasterBundle: boolean;
  };
  public coreState: {
    appMaintenance: boolean;
  };

  constructor(
    appPocket: undefined | null | { [key: string]: any },
    appInfo: { [key: string]: string; bundleUid: string; isMasterBundle: string }
  );

  public toObject(): AppPocketInterface;

  public static getDefaultAppPocket<
    AppInfo extends AppInfoInterface = { [key: string]: string; bundleUid: string; isMasterBundle: string }
  >(appInfo: AppInfo): AppPocketInterface;
}

type RenderComponent = { prototype: object } | React.FunctionComponent<any> | React.ComponentClass<any, any>;

interface RoutesConfig {
  prefix: string;
  layout: string | React.FunctionComponent<LayoutProps>;
  routes: {
    [key: string]: RenderComponent;
  };
  condition: () => boolean;
}

interface RouterConfig {
  [key: string]: RoutesConfig;
}

interface LayoutProps {
  children: any;
}

export { AppPocket, State, Lang, Seed };
export type { AppInfoInterface, AppPocketInterface, RouterConfig, RoutesConfig, LayoutProps, RenderComponent };
