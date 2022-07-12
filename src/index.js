import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Cart from './components/Cart';
import Menu from './components/Menu';
import Overview from './components/Overview';
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
            <Route path="/menu" element={<Menu />} />
            <Route path="/" element={<Overview type="home" />} />
            <Route path="/cart" element={<Overview type="cart" />} />
            <Route path="/favourite" element={<Overview type="favourite" />} />
            <Route path="/:section" element={<Overview type="section" />} >
              <Route path="/:section/:item" element={<Item />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
