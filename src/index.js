import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user.context';
import reportWebVitals from './reportWebVitals';
// import { dom } from 'aria-query';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap our App Component inside our broswer router */}
    <BrowserRouter>
      {/* ALso wrap our App Component inside our UserProvider (to provide our context) */}
      <UserProvider> 
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
