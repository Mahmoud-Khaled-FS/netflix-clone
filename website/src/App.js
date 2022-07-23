import React from 'react';
import './app.css';
import 'normalize.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SimpleSetup from './pages/SimpleSetup';
import Browse from './pages/Browse';
import { store } from './store/store';
import { Provider } from 'react-redux';
import NotFound from './pages/404';
import Protected from './components/auth/protected';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Protected.NotAuth children={<Home />} />} />
          <Route path="/login" element={<Protected.NotAuth children={<Login />} />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup/*" element={<Protected.NotAuth children={<Signup />} />} />
          <Route path="/simpleSetup/*" element={<Protected children={<SimpleSetup />} />} />
          {/* <Route path="/simpleSetup/*" element={<SimpleSetup />} /> */}
          <Route path="/browse/*" element={<Protected children={<Browse />} />} />
          <Route path="/NotFound" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
