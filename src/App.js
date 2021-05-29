import React, {useMemo} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Base from "./pages/Base/Base";
import AuthRoute from "./pages/AuthRoute";
import {useSelector} from "react-redux";
import LoginContainer from "./pages/Login/LoginContainer";

// TODO : 나중에 redux 로 auth 확인후 / 로 redirect 지금은 임시로 /home 해놓은 것
function App() {
    const user = useSelector(state => (state.user.status));
    const authenticated = user === 200 ? true : false;

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact={true} render={() => <LoginContainer />} />
                <AuthRoute path="/" authenticated={authenticated} render={() => <Base />} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;