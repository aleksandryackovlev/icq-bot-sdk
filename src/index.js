import * as icqApi from './api/api.yaml';

const ICQClient = ({ token, apiUrl = 'https://api.icq.net/bot/v1' } = {}) => {
  return Object.keys(icqApi).reduce((acc, method) => {
    const [prefix, methodName] = method.split('_');

    return methodName
      ? {
          ...acc,
          [prefix]: {
            ...acc.prefix,
            [methodName]: (request = {}, options = {}) =>
              icqApi[method](
                {
                  ...request,
                  query: {
                    token,
                    ...request.query,
                  },
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
