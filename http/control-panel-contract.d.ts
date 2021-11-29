import { RoutesConfig } from '../state';

declare abstract class ControlPanel {
  abstract getRoutesConfigGate(prefix: string): RoutesConfig;
  abstract getRoutesConfigMain(prefix: string): RoutesConfig;
}

export { ControlPanel };
