import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { StaticRouter } from 'react-router';
import path from 'path';
import fs from 'fs';

import App from '../../shared/App';

let router = express.Router();

router.use(function (req, res) {

  let context = {};
  let webpackStats = {};
  const application = ReactDOM.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (process.env.NODE_ENV === 'development') {
    webpackStats = res.locals.webpackStats.toJson();
  } else {
    webpackStats = require('../../../dist/stats.json');
  }

  const chunkNames = flushChunkNames();
  const {
    js,
    styles,
    cssHash
  } = flushChunks(webpackStats, { chunkNames });

  res.send(`<!DOCTYPE html><html><head><title>Page Title</title>${styles}</head><body><div id='react-root'>${application}</div>${cssHash}${js}</body></html>`);

});

    

export default router;