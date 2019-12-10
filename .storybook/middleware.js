const proxy = require('http-proxy-middleware');

const proxies = {
  '/graphql': process.env.REACT_APP_SERVER_URL || 'http://127.0.0.1:8000/',
};

module.exports = function proxyMiddleware(router) {
  const proxyConfig = proxies;

  for (let domain in proxyConfig) {
    if (typeof proxyConfig[domain] === 'string') {
      router.use(
        domain,
        proxy({
          target: proxyConfig[domain],
        }),
      );
    } else {
      router.use(domain, proxy(proxyConfig[domain]));
    }
  }
};
