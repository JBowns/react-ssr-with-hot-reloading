import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../../shared/App.jsx';

const render = Component => {
  hydrate(
    <Router>
      <Component/>
    </Router>,
    document.getElementById('react-root')
  );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}