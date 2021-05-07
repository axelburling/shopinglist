import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
