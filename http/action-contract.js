const {
  CommandResult,
  RetrieveResult,
  QueryResult,
  AuthResult,
  TaskResult,
} = require('@sotaoi/contracts/transactions');
const { output } = require('@sotaoi/client/output');
const { store } = require('@sotaoi/client/store');
const { logger } = require('@sotaoi/client/logger');
const { notification } = require('@sotaoi/client/notification');
const { ErrorCode } = require('@sotaoi/contracts/errors');

class ActionContract {
  async store(accessToken, artifacts, role, repository, payload) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository || '');
      return notification().conclusion(
        output().parseCommand(await (await fetch(apiUrl + '/store', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      logger().estack(err);
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  async self(authRecord, accessToken, requestAbortHandler) {
    try {
      const apiUrl = store().getApiUrl();
      if (!authRecord || !accessToken) {
        return new RetrieveResult(404, null, 'Error', 'Auth record is missing', null, null, {});
      }
      const formData = new FormData();
      formData.append('accessToken', accessToken);
      const controller = new AbortController();
      requestAbortHandler.register(() => controller.abort());
      const result = await (
        await fetch(apiUrl + '/self', { signal: controller.signal, method: 'POST', body: formData })
      ).json();

      return result;
    } catch (err) {
      logger().estack(err);
      return new RetrieveResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
    }
  }

  async update(accessToken, artifacts, role, repository, uuid, payload) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository || '');
      formData.append('uuid', uuid || '');
      return notification().conclusion(
        output().parseCommand(await (await fetch(apiUrl + '/update', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      logger().estack(err);
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  async retrieve(accessToken, role, repository, uuid, variant, requestAbortHandler) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = new FormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository);
      formData.append('uuid', uuid);
      formData.append('variant', variant || '');
      const controller = new AbortController();
      requestAbortHandler.register(() => controller.abort());
      const result = await (
        await fetch(apiUrl + '/retrieve', { signal: controller.signal, method: 'POST', body: formData })
      ).json();

      return result;
    } catch (err) {
      logger().estack(err);
      return new RetrieveResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
    }
  }

  async flistQuery(accessToken, role, repository, list, filters, variant, requestAbortHandler) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = new FormData();
      formData.append('type', 'flist');
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository);
      formData.append('list', list);
      formData.append('filters', filters ? JSON.stringify(filters) : '');
      formData.append('variant', variant || '');
      const controller = new AbortController();
      requestAbortHandler.register(() => controller.abort());
      return await (
        await fetch(apiUrl + '/query', { signal: controller.signal, method: 'POST', body: formData })
      ).json();
    } catch (err) {
      logger().estack(err);
      return new QueryResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
    }
  }

  async plistQuery(accessToken, role, repository, list, filters, requestAbortHandler) {
    // nothing here yet
    return new QueryResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
  }

  async slistQuery(accessToken, role, repository, list, filters, requestAbortHandler) {
    // nothing here yet
    return new QueryResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
  }

  async remove(accessToken, role, repository, uuid) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = new FormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository);
      formData.append('uuid', uuid);
      return notification().conclusion(
        output().parseCommand(await (await fetch(apiUrl + '/remove', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      logger().estack(err);
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  async auth(artifacts, repository, strategy, payload) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('repository', repository);
      formData.append('strategy', strategy);
      return notification().conclusion(
        output().parseAuth(await (await fetch(apiUrl + '/auth', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      logger().estack(err);
      return notification().conclusion(
        new AuthResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, null, {})
      );
    }
  }

  async deauth() {
    try {
      const apiUrl = store().getApiUrl();
      await (await fetch(apiUrl + '/auth', { method: 'DELETE' })).json();
      await store().setAuthRecord(null, null);
    } catch (err) {
      logger().estack(err);
    }
  }

  async task(accessToken, artifacts, role, repository, task, payload) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository || '');
      formData.append('task', task || '');
      return notification().conclusion(
        output().parseTask(await (await fetch(apiUrl + '/task', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      logger().estack(err);
      return notification().conclusion(
        new TaskResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  async call(input, init) {
    return await fetch(input, init);
  }
}

module.exports = { ActionContract };
