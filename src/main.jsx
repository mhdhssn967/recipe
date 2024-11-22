import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { appStore } from './redux/appStore';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
