import type { CommandResult, AuthResult, TaskResult } from '../transactions';

type TransformerFn = (
  item: any,
  prefix: string,
  iterate: (item: any, prefix: string, transformer: TransformerFn, prop: string) => any,
  prop: string
) => any;

declare class OutputContract {
  public allowSkipUnchanged(): boolean;

  public getTouchFieldsTransformer(
    isUpdateCommand: boolean
  ): (item: any, prefix: string, transformer: TransformerFn, prop: string) => any;

  public getFieldTransformer(
    skipUnchanged: boolean
  ): (item: any, prefix: string, transformer: TransformerFn, prop: string) => any;

  // OMNI

  public parseCommand(output: { [key: string]: any }): CommandResult;

  // parseQuery

  // parseRetrieve

  public parseAuth(output: { [key: string]: any }): AuthResult;

  public parseTask(output: { [key: string]: any }): TaskResult;
}

export { OutputContract };
