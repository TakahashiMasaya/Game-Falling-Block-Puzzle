import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { P5 } from './pages/p5';
import { Home } from './pages/home';

import './scss/index.scss';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`${process.env.ROOT_PATH}`} exact component={Home} />
      <Route path={`${process.env.ROOT_PATH}p5`} exact component={P5} />
      <Redirect to={`${process.env.ROOT_PATH}`} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('App'));
