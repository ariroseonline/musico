import React from "react"
import {render} from "react-dom"
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import Main from "./components/main"
import App from "./components/app"

require("normalize.css/normalize.css");
require("./global.css");

render((
  <Router history={browserHistory}>
    <Route component={App} path="/">
      <IndexRoute component={Main} />
    </Route>
  </Router>
), document.getElementById("app"))
