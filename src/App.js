import React from "react";
import {BrowserRouter, Switch, Route, Redirect, withRouter} from "react-router-dom";
import {default as Login} from "./pages/Login";

import Base from "./pages/Base";

// TODO : 나중에 redux 로 auth 확인후 / 로 redirect 지금은 임시로 /home 해놓은 것
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact={true} render={() => <Login />} />
                <Route path="/"  render={() => <Base />} />
                <Redirect from="/" exact to="/login" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;