import { server } from '@hapi/hapi';
import { config } from './config';

const main = async () => {
  const serverInstance = server({
    port: config.get('server.port'),
    host: '0.0.0.0',
  });

  await serverInstance.start();
  console.log('Server running on %s', serverInstance.info.uri);
};

(async () => {
  await main();
})();
