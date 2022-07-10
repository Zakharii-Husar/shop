import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Cart from './components/Cart';
import Menu from './components/Menu';
import Section from './components/Section';
import Item from './components/Item';
import { store } from './store';
import { Provider } from 'react-redux';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/cart" element={<Section />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/:section" exact element={<Section />} >
              <Route path="/:section/:item" element={<Item />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
