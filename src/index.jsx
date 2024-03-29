import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import configureStore from './store';

import App from "./App";
import './index.css';
import server from './server';

server({ environment: "development" })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
