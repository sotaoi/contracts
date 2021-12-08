import { CommandResult, RetrieveResult, QueryResult, AuthResult, TaskResult } from '@sotaoi/contracts/transactions';
import { Output } from '@sotaoi/client/output';
import { store } from '@sotaoi/client/store';
import { logger } from '@sotaoi/client/logger';
import { notification } from '@sotaoi/client/notification';
import { ErrorCode } from '@sotaoi/contracts/errors';

class ActionContract {
  async store(accessToken, artifacts, role, repository, payload) {
    try {
      const apiUrl = store().getApiUrl();
      const formData = payload.getFormData();
      formData.append('accessToken', accessToken || '');
      formData.append('role', role || '');
      formData.append('repository', repository || '');
      return notification().conclusion(
        Output.parseCommand(await (await fetch(apiUrl + '/store', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
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
        Output.parseCommand(await (await fetch(apiUrl + '/update', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new CommandResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
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
      return new RetrieveResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {});
    }
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
        Output.parseCommand(await (await fetch(apiUrl + '/remove', { method: 'POST', body: formData })).json())
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
        Output.parseAuth(await (await fetch(apiUrl + '/auth', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new AuthResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, null, {})
      );
    }
  }

  async deauth() {
    const apiUrl = store().getApiUrl();
    await (await fetch(apiUrl + '/auth', { method: 'DELETE' })).json();
    await store().setAuthRecord(null, null);
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
        Output.parseTask(await (await fetch(apiUrl + '/task', { method: 'POST', body: formData })).json())
      );
    } catch (err) {
      return notification().conclusion(
        new TaskResult(400, ErrorCode.APP_GENERIC_ERROR, 'Error', 'Something went wrong', null, null, {})
      );
    }
  }

  async call(input, init) {
    return await fetch(input, init);
  }
}

export { ActionContract };
