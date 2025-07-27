import React, { Component } from "react";
import ReactDOM from "react-dom";


import { HashRouter as Router, Route } from "react-router-dom";
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/materialize-css/dist/js/materialize.min';

import App from "./components/App";



ReactDOM.render(
      <Router>
        <Route component={() => (
            <App /> 
          )}
        />
      </Router>,
  document.getElementById("root")
);
