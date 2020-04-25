import * as icqApi from './api/api.yaml';

const ICQClient = ({ token, apiUrl = 'https://api.icq.net/bot/v1' } = {}) => {
  return Object.keys(icqApi).reduce((acc, method) => {
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
};

export default ICQClient;
