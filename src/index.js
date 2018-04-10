import express from 'express';
import http from 'http';
import path from 'path';

import { walkSync } from './utils';
import clientApplication from './client';
import serverApplication from './server';

const PORT = process.env.PORT || '3000';

const exitHandler = (caller, err) => {
  if (err) console.log(`${caller}\n${err.stack}`);
  if (server) {
    server.removeListener('request', app);
    server.close();
  }
  process.kill(process.pid, 'SIGHUP');
};

process.stdin.resume();

process.on('exit', exitHandler.bind(null, 'exit'));
process.on('SIGINT', exitHandler.bind(null, 'SIGINT'));
process.on('SIGUSR1', exitHandler.bind(null, 'SIGUSR1'));
process.on('SIGUSR2', exitHandler.bind(null, 'SIGUSR2'));
process.on('uncaughtException', exitHandler.bind(null, 'uncaughtException'));

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

server.on('listening', () => {
  console.log(`Environment -> ${process.env.NODE_ENV}`);
  console.log(`Listening   -> http://localhost:${PORT}/`);
});

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./server');
  module.hot.decline(walkSync(path.resolve(__dirname, '../src')).filter(filePath => /client/.test(filePath)));
}

server.listen(PORT);