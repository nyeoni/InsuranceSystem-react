import React, {useMemo, useState} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Base from "./pages/Base/Base";
import AuthRoute from "./pages/AuthRoute";
import {useSelector} from "react-redux";
import LoginContainer from "./pages/Login/LoginContainer";

function App() {
    const user = useSelector(state => (state.user.status));
    const authenticated = user === "OK" ? true : false;
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact={true} render={() => <LoginContainer />} />
                <AuthRoute path="/" authenticated={authenticated} render={() => <Base />} />
                {/*<Route path="/" render={() => <Base />} />*/}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
