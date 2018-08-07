import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <div>{routes}</div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
