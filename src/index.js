import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import store from "./store";
import Provider from "react-redux/es/components/Provider";
import { Router } from "react-router-dom";
import history from "./history";

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
