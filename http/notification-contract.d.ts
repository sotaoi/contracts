import {
  SweetAlertOptions,
  SweetAlertResult,
  Awaited,
  SweetAlert2,
  ReactSweetAlert,
} from '@sotaoi/contracts/definitions/notification-interface';
import { CommandResult, QueryResult, ActionConclusion, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';

type PushRoute = (to: string, goTop?: boolean) => void;

declare abstract class NotificationContract {
  abstract swal: SweetAlert2 & ReactSweetAlert;
  abstract fire<T = any>(options: SweetAlertOptions<T>): Promise<SweetAlertResult<Awaited<T>>>;
  abstract process<T = any>(
    result: CommandResult | QueryResult | AuthResult | TaskResult
  ): Promise<SweetAlertResult<Awaited<T>>>;
  abstract conclusion<T = any>(result: CommandResult | QueryResult | AuthResult | TaskResult): ActionConclusion<T>;

  protected pushRoute: PushRoute;

  constructor(pushRoute: PushRoute);
}

export { NotificationContract };
export type { PushRoute };
