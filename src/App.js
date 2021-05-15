import React from "react";
import {BrowserRouter, Switch, Route, Redirect, withRouter} from "react-router-dom";
import {default as Login} from "./pages/Login";
import Profile from "./pages/Profile";

import Base from "./pages/Base";


function App() {
    return (
        <BrowserRouter>
            <main className="App">
                <Switch>
                    <Route path="/login" exact={true} render={props => <Login />} />
                    {/*<Route path="/" exact={true} render={props => true ? <Login /> : (<Redirect*/}
                    {/*    to={{ pathname: "/login"}} />) } />*/}
                    <Route paht="/home" exact={true} render={() => <Base />} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default withRouter(App);