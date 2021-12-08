import { RoutesConfig } from '../state';

declare abstract class ControlPanelContract {
  abstract getRoutesConfigGate(prefix: string): RoutesConfig;
  abstract getRoutesConfigMain(prefix: string): RoutesConfig;
}

export { ControlPanelContract };
