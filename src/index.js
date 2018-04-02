import express from 'express';
import http from 'http';
import path from 'path';

import { walkSync } from './utils';
import clientApplication from './client';
import serverApplication from './server';

const PORT = process.env.PORT || '3000';

const onServerListening = () => {
  console.log(`Environment -> ${process.env.NODE_ENV}`);
  console.log(`Listening   -> http://localhost:${PORT}/`);
};

const onServerError = (error) => {
  if (error.syscall !== 'listen')
    throw error;
  switch (error.code) {
    case 'EACCES':
      console.error(`port ${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`port ${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onSignalInterrupt = () => {
  if (server) {
    server.removeListener('request', app);
    server.close();
  }
  process.kill(process.pid, 'SIGHUP');
};

process.on('SIGINT', onSignalInterrupt);

let app = express();
app.use(clientApplication);

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    import('./server').then(mod => mod.default(req, res, next));
  });
} else {
  app.use(serverApplication);
}

let server = http.createServer(app);
server.on('error', onServerError);
server.on('listening', onServerListening);
server.listen(PORT);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./server');
  module.hot.decline(walkSync(path.resolve(__dirname, '../src')).filter(filePath => /client/.test(filePath)));
}