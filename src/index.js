import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import * as serviceWorker from './service-worker';

const rootElement = document.getElementById("shell");
ReactDOM.render(<App />, rootElement);

serviceWorker.unregister();
// serviceWorker.register();
