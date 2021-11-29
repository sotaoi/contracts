const { ErrorCode } = require('./errors');

class MsgResult {
  constructor(code, errorCode, title, msg, xdata) {
    this.code = code;
    this.errorCode = errorCode;
    this.title = title;
    this.msg = msg;
    this.xdata = xdata;
  }

  async output(handler) {
    return handler.response(this).code(this.code);
  }
}

// C.R.A.Q.

class ErrorResult {
  constructor(code, errorCode, title, msg, validations, xdata) {
    this.code = code;
    this.errorCode = errorCode;
    this.title = title;
    this.msg = msg;
    this.validations = validations;
    this.xdata = xdata;
  }
}

class Command {
  constructor(authRecord, artifacts, role, repository) {
    this.authRecord = authRecord;
    this.artifacts = artifacts;
    this.role = role;
    this.repository = repository;
  }
}

class CommandResult {
  constructor(code, errorCode, msg, title, artifact, validations, xdata) {
    this.success = code >= 200 && code < 300 ? true : false;
    this.code = code;
    this.errorCode = errorCode;
    this.msg = msg;
    this.title = title;
    this.artifact = artifact;
    this.validations = validations;
    this.xdata = xdata;
  }

  getCode() {
    return this.code;
  }

  getError() {
    return new ErrorResult(this.code, ErrorCode.APP_GENERIC_ERROR, this.msg, this.title, this.validations, this.xdata);
  }
}

class RetrieveResult {
  constructor(code, errorCode, title, msg, record, validations, xdata) {
    this.success = code >= 200 && code < 300 ? true : false;
    this.code = code;
    this.errorCode = errorCode;
    this.title = title;
    this.msg = msg;
    this.record = record;
    this.validations = validations;
    this.xdata = xdata;
  }

  getCode() {
    return this.code;
  }
}

class AuthResult {
  constructor(code, errorCode, title, msg, authRecord, accessToken, validations, xdata) {
    this.success = code >= 200 && code < 300 ? true : false;
    this.code = code;
    this.errorCode = errorCode;
    this.msg = msg;
    this.title = title;
    this.authRecord = authRecord;
    this.accessToken = accessToken;
    this.validations = validations;
    this.xdata = xdata;
  }

  getCode() {
    return this.code;
  }

  getError() {
    return new ErrorResult(this.code, ErrorCode.APP_GENERIC_ERROR, this.msg, this.title, this.validations, this.xdata);
  }
}

class TaskResult {
  constructor(code, errorCode, title, msg, data, validations, xdata) {
    this.success = code >= 200 && code < 300 ? true : false;
    this.code = code;
    this.errorCode = errorCode;
    this.msg = msg;
    this.title = title;
    this.data = data;
    this.validations = validations;
    this.xdata = xdata;
  }

  getCode() {
    return this.code;
  }

  getError() {
    return new ErrorResult(this.code, ErrorCode.APP_GENERIC_ERROR, this.msg, this.title, this.validations, this.xdata);
  }
}

class QueryResult {
  constructor(code, errorCode, title, msg, records, validations, xdata) {
    this.success = code >= 200 && code < 300 ? true : false;
    this.code = code;
    this.errorCode = errorCode;
    this.title = title;
    this.msg = msg;
    this.records = records;
    this.validations = validations;
    this.xdata = xdata;
  }

  getCode() {
    return this.code;
  }
}

class Payload {
  constructor(data) {
    this.data = data;
  }

  getFormData() {
    const formData = new FormData();
    Object.entries(this.data).map(([name, field]) => {
      name = `data.${name}`;
      switch (true) {
        case field === undefined:
          return;
        case field === null:
        case field instanceof Array && !field.length:
          formData.append(name, '');
          return;
        case field instanceof Array:
          field.map((file) => formData.append(`${name}[]`, file));
          return;
        default:
          formData.append(name, field);
      }
    });
    return formData;
  }
}

class Query extends Command {
  constructor(type, authRecord, artifacts, role, repository, list, filters) {
    super(authRecord, artifacts, role, repository);
    this.type = type;
    this.list = list;
    this.filters = filters;
  }
}

class Retrieve {
  constructor(authRecord, role, repository, uuid, variant = null) {
    this.authRecord = authRecord;
    this.role = role;
    this.repository = repository;
    this.uuid = uuid;
    this.variant = variant;
  }
}

class FlistQuery extends Query {
  constructor(authRecord, artifacts, role, repository, list, filters, variant) {
    if (!(filters instanceof FlistFilters) && filters !== null) {
      throw new Error('something went wrong - bad flist filters');
    }
    super('flist', authRecord, artifacts, role, repository, list, filters);
    this.variant = variant;
  }
}

class PlistQuery extends Query {
  constructor(authRecord, artifacts, role, repository, list, filters, variant) {
    if (!(filters instanceof PlistFilters) && filters !== null) {
      throw new Error('something went wrong - bad plist filters');
    }
    super('plist', authRecord, artifacts, role, repository, list, filters);
    this.variant = variant;
  }
}

class SlistQuery extends Query {
  constructor(authRecord, artifacts, role, repository, list, filters, variant) {
    if (!(filters instanceof SlistFilters) && filters !== null) {
      throw new Error('something went wrong - bad slist filters');
    }
    super('slist', authRecord, artifacts, role, repository, list, filters);
    this.variant = variant;
  }
}

class QueryFilters {
  //
}

class FlistFilters extends QueryFilters {
  constructor(where, limit) {
    super();
    this.where = where;
    this.limit = limit;
  }
}

class PlistFilters extends QueryFilters {
  constructor(where, page, perPage) {
    super();
    this.where = where;
    this.page = page;
    this.perPage = perPage;
  }
}

class SlistFilters extends QueryFilters {
  constructor(where, batchSize) {
    super();
    this.where = where;
    this.batchSize = batchSize;
  }
}

//

class RequestAbortHandlerAbstract {
  constructor() {
    this.aborts = [];
  }

  abort() {
    throw new Error('RequestAbortHandler has no method "abort" implemented');
  }
  register(abort) {
    throw new Error('RequestAbortHandler has no method "register" implemented');
  }
  clear() {
    throw new Error('RequestAbortHandler has no method "clear" implemented');
  }
}

//

class ActionConclusion {
  constructor(result, notification, pushRoute) {
    this._result = result;
    this.notification = notification;
    this.pushRoute = pushRoute;
  }
  result() {
    return this._result;
  }
  commandResult() {
    if (!(this._result instanceof CommandResult)) {
      throw new Error('command result is corrupt');
    }
    return this._result;
  }
  authResult() {
    if (!(this._result instanceof AuthResult)) {
      throw new Error('query result is corrupt');
    }
    return this._result;
  }
  taskResult() {
    if (!(this._result instanceof TaskResult)) {
      throw new Error('query result is corrupt');
    }
    return this._result;
  }
  async notify(nextRoute = null) {
    await this.notification.process(this._result);
    if (!nextRoute || !this._result.success) {
      return;
    }
    this.pushRoute(nextRoute);
  }
  xnotify() {
    return this.notification.process(this._result);
  }
  successful() {
    return this._result.success;
  }
}

//

const ListenerEventType = {
  DB: {
    Records: {
      UPDATED: 'db.records.updated',
      REMOVED: 'db.records.removed',
    },
  },
};

const ListenerEvent = (event, recordRef) => {
  return `${event}:${recordRef.serialize()}`;
};

//

module.exports = {
  Command,
  ErrorResult,
  MsgResult,
  CommandResult,
  RetrieveResult,
  QueryResult,
  AuthResult,
  TaskResult,
  Payload,
  Retrieve,
  FlistQuery,
  PlistQuery,
  SlistQuery,
  QueryFilters,
  FlistFilters,
  PlistFilters,
  SlistFilters,
  RequestAbortHandlerAbstract,
  ActionConclusion,
  ListenerEventType,
  ListenerEvent,
};
