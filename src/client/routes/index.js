import path from 'path';
import express from 'express';

let router = express.Router();

if (process.env.NODE_ENV === 'development') {

  Promise.all([
    import('webpack'),
    import('webpack-dev-middleware'),
    import('webpack-hot-middleware'),
    import('../../../webpack.client')
  ]).then(([
    { default: webpack },
    { default: webpackDevMiddleware },
    { default: webpackHotMiddleware },
    { default: webpackConfig }
  ] = []) => {

    const compiler = webpack(webpackConfig);

    router.use(webpackDevMiddleware(compiler, {
      logLevel: 'warn', stats: 'errors-only'
    }));

    router.use(webpackHotMiddleware(compiler));

  });

} else {
  router.use('/', express.static(path.resolve(__dirname, 'public')));
}

export default router;