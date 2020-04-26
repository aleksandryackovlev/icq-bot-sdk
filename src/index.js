import EventEmitter from 'events';

import * as icqApi from './api/api.yaml';

/* eslint-disable no-await-in-loop */
const ICQClient = ({ token, apiUrl = 'https://api.icq.net/bot/v1' } = {}) => {
  let icqClient = Object.keys(icqApi).reduce((acc, method) => {
    const [prefix, methodName] = method.split('_');

    return methodName
      ? {
          ...acc,
          [prefix]: {
            ...acc.prefix,
            [methodName]: ({ file, ...request } = {}, options = {}) =>
              icqApi[method](
                {
                  query: {
                    token,
                    ...request,
                  },
                  ...(file
                    ? {
                        data: {
                          file,
                        },
                      }
                    : {}),
                },
                {
                  baseUrl: apiUrl,
                  ...options,
                }
              ),
          },
        }
      : acc;
  }, {});

  icqClient = {
    ...icqClient,
    isRunning: false,
    sleep: (timeout) =>
      new Promise((resolve) => {
        setTimeout(resolve, timeout);
      }),
    async startPolling({ pollTime = 1, timeout = 5, lastEventId = null } = {}) {
      this.isRunning = true;

      const eventId = lastEventId || 0;

      while (this.isRunning) {
        try {
          const {
            json: { events },
          } = await this.events.get({ lastEventId: eventId, pollTime });

          events.forEach(({ type, ...response }) => {
            this.emit(type, response);
            this.emit('all', response);
          });
        } catch (error) {
          this.emit('error', error);
        }

        await this.sleep(timeout * 1000);
      }
    },
    stop() {
      this.isRunning = false;
    },
  };

  Object.setPrototypeOf(icqClient, new EventEmitter());

  return icqClient;
};

export default ICQClient;
