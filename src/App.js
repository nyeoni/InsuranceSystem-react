import React from "react";
import {BrowserRouter, Switch, Route, Redirect, withRouter} from "react-router-dom";
import {default as Login} from "./pages/Login";

import Base from "./pages/Base";


function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact={true} render={() => <Login />} />
                <Route path="/home"  render={() => <Base />} />
                <Redirect from="/" exact to="/login" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;