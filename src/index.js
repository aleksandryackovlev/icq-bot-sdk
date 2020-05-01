import EventEmitter from 'events';

import * as icqApi from './api/api.yaml';

const createStorage = (initialEventId = 0) => {
  let lastEventId = initialEventId;

  return {
    getId: async () => lastEventId,
    setId: async (eventId) => {
      lastEventId = eventId;

      return lastEventId;
    },
  };
};

/* eslint-disable no-await-in-loop */
const ICQClient = ({
  token,
  apiUrl = 'https://api.icq.net/bot/v1',
  pollTime = 1,
  timeout = 5,
  eventIdStorage = createStorage(),
} = {}) => {
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
    sleep: (sleepTimeout) =>
      new Promise((resolve) => {
        setTimeout(resolve, sleepTimeout);
      }),
    async tick({
      pollTime: pollingPollTime,
      timeout: pollingTimeout,
      eventIdStorage: pollingEventIdStorage,
    }) {
      try {
        const lastEventId = await pollingEventIdStorage.getId();

        const {
          json: { events },
        } = await this.events.get({ lastEventId, pollTime: pollingPollTime });

        if (events && events.length) {
          await pollingEventIdStorage.setId(events[events.length - 1].eventId);
        }

        events.forEach((response) => {
          this.emit(response.type, response);
          this.emit('all', response);
        });
      } catch (error) {
        this.emit('error', error);
      }

      await this.sleep(pollingTimeout * 1000);
    },
    async startPolling({
      pollTime: pollingPollTime = pollTime,
      timeout: pollingTimeout = timeout,
      eventIdStorage: pollingEventIdStorage = eventIdStorage,
    } = {}) {
      this.isRunning = true;

      while (this.isRunning) {
        await this.tick({
          pollTime: pollingPollTime,
          timeout: pollingTimeout,
          eventIdStorage: pollingEventIdStorage,
        });
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
