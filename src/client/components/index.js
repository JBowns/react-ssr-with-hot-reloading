import React from 'react';
import { hydrate } from 'react-dom';

import App from '../../shared/components/App.jsx';

const render = Component => {
  hydrate(<Component />, document.getElementById('react-root'));
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}