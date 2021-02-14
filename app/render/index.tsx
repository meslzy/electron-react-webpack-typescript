import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./source/app";
import "./index.scss";

window.dev = process.env.NODE_ENV === "development";

ReactDOM.render(<App/>, document.getElementById("app"));

if (typeof module.hot !== 'undefined') module.hot.accept();
