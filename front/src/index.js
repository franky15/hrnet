import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//importation des éléments de redux et du store

import {configureStore} from '@reduxjs/toolkit';
//importation des éléments de redux et du store
import { Provider } from 'react-redux';
//import store from './_services/redux/store/store';

//importation des actions
import employeesReducer from './pages/publicPages/_slices.js/employeesSlice';

//creation du store
const store = configureStore({

  reducer: {

    employees: employeesReducer,
    
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
