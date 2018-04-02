import express from 'express';
import { renderToString } from 'react-dom/server';
import App from '../../shared/components/App.jsx';
import React, { Component } from 'react';

let router = express.Router();

router.get('/', function(req, res, next) {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <div id='react-root'>${renderToString(<App/>)}</div>
  <script src="/client.js"></script>
</body>
</html>`);
});

export default router;