const { BaseField } = require('@sotaoi/client-forms/fields/base-field');
const { SingleCollectionField, CollectionField } = require('@sotaoi/client-forms/fields/collection-field');
const { Helper } = require('@sotaoi/client/helper');

class OutputContract {
  constructor() {
    this.ALLOW_SKIP_UNCHANGED = true;
  }

  allowSkipUnchanged() {
    return this.ALLOW_SKIP_UNCHANGED;
  }

  getTouchFieldsTransformer(isUpdateCommand) {
    return (item, prefix, transformer, prop) => {
      const key = prefix ? `${prefix}.${prop}` : prop;
      switch (true) {
        case item instanceof SingleCollectionField:
        case item instanceof CollectionField:
          // multi collection
          if (item.fields instanceof Array) {
            item.fields.map((field, index) =>
              transformer(
                field,
                `${key}.fields.${index.toString()}`,
                this.getTouchFieldsTransformer(isUpdateCommand),
                ''
              )
            );
            return item;
          }
          // single collection
          transformer(item.fields, `${key}.fields`, this.getTouchFieldsTransformer(isUpdateCommand), '');
          return item;
        // single field
        case item instanceof BaseField:
          !isUpdateCommand && item.setTouched(true);
          return item;
        default:
          Helper.iterate(item, `${key}`, this.getTouchFieldsTransformer(isUpdateCommand));
          return item;
      }
    };
  }

  getFieldTransformer(skipUnchanged) {
    return (item, prefix, transformer, prop) => {
      const key = prefix ? `${prefix}.${prop}` : prop;
      switch (true) {
        case item instanceof SingleCollectionField:
        case item instanceof CollectionField:
          // multi collection
          if (item.fields instanceof Array) {
            return item.fields.map((field, index) =>
              transformer(field, `${key}.fields.${index.toString()}`, this.getFieldTransformer(skipUnchanged), '')
            );
          }
          // single collection
          return transformer(item.fields, `${key}.fields`, this.getFieldTransformer(skipUnchanged), '');
        // single field
        case item instanceof BaseField:
          if (skipUnchanged && !item.wasChanged() && this.ALLOW_SKIP_UNCHANGED) {
            return;
          }
          return item.value !== null ? item.value.serialize() : null;
        default:
          return Helper.iterate(item, `${key}`, this.getFieldTransformer(skipUnchanged));
      }
    };
  }

  // OMNI

  parseCommand(output) {
    const { CommandResult } = require('@sotaoi/contracts/transactions');
    try {
      switch (true) {
        case typeof output !== 'object':
        case typeof output.code !== 'number':
        case typeof output.errorCode !== 'string' && output.errorCode !== null:
        case typeof output.title !== 'string':
        case typeof output.msg !== 'string':
        case typeof output.artifact === 'undefined':
        case typeof output.validations === 'undefined':
        case typeof output.xdata === 'undefined':
          throw new Error('bad command output');
        default:
          return new CommandResult(
            output.code,
            output.errorCode,
            output.title,
            output.msg,
            output.artifact || null,
            output.validations || null,
            output.xdata || {}
          );
      }
    } catch (err) {
      const { ErrorCode } = require('@sotaoi/contracts/errors');
      return new CommandResult(
        400,
        ErrorCode.APP_GENERIC_ERROR,
        err && err.name ? err.name : 'Error',
        err && err.message ? err.message : 'Something went wrong',
        null,
        null,
        {}
      );
    }
  }

  // parseQuery

  // parseRetrieve

  parseAuth(output) {
    const { AuthResult } = require('@sotaoi/contracts/transactions');
    try {
      switch (true) {
        case typeof output !== 'object':
        case typeof output.code !== 'number':
        case typeof output.errorCode !== 'string' && output.errorCode !== null:
        case typeof output.title !== 'string':
        case typeof output.msg !== 'string':
        case typeof output.authRecord === 'undefined':
        case typeof output.accessToken === 'undefined':
        case typeof output.validations === 'undefined':
        case typeof output.xdata === 'undefined':
          throw new Error('bad auth output');
        default:
          return new AuthResult(
            output.code,
            output.errorCode,
            output.title,
            output.msg,
            output.authRecord || null,
            output.accessToken || null,
            output.validations || null,
            output.xdata || {}
          );
      }
    } catch (err) {
      const { ErrorCode } = require('@sotaoi/contracts/errors');
      return new AuthResult(
        400,
        ErrorCode.APP_GENERIC_ERROR,
        err && err.name ? err.name : 'Error',
        err && err.message ? err.message : 'Something went wrong',
        null,
        null,
        null,
        {}
      );
    }
  }

  parseTask(output) {
    const { TaskResult } = require('@sotaoi/contracts/transactions');
    try {
      switch (true) {
        case typeof output !== 'object':
        case typeof output.code !== 'number':
        case typeof output.errorCode !== 'string' && output.errorCode !== null:
        case typeof output.title !== 'string':
        case typeof output.msg !== 'string':
        case typeof output.data === 'undefined':
        case typeof output.validations === 'undefined':
        case typeof output.xdata === 'undefined':
          throw new Error('bad task output');
        default:
          return new TaskResult(
            output.code,
            output.errorCode,
            output.title,
            output.msg,
            output.data || null,
            output.validations || null,
            output.xdata || {}
          );
      }
    } catch (err) {
      const { ErrorCode } = require('@sotaoi/contracts/errors');
      return new TaskResult(
        400,
        ErrorCode.APP_GENERIC_ERROR,
        err && err.name ? err.name : 'Error',
        err && err.message ? err.message : 'Something went wrong',
        null,
        null,
        {}
      );
    }
  }
}

module.exports = { OutputContract };
