import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import store from "./store";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Provider from "react-redux/es/components/Provider";
import { BrowserRouter } from "react-router-dom";

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
