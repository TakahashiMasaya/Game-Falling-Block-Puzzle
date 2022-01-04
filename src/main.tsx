import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { P5 } from './pages/p5';
import { Home } from './pages/home';

import './scss/index.scss';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`${process.env.ROOT_PATH}`} element={<Home />} />
      <Route path={`${process.env.ROOT_PATH}p5`} element={<P5 />} />
      <Route path="*" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('App'));
