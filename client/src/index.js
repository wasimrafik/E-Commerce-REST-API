import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store , persistor} from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import axios from 'axios';
const container = document.getElementById('root');
const root = createRoot(container);


axios.defaults.baseURL = "http://localhost:8001";
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

