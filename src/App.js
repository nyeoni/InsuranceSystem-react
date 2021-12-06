import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Base from "./pages/Base/Base";
import AuthRoute from "./pages/AuthRoute";
import LoginContainer from "./pages/Login/LoginContainer";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function App() {
  const token = cookies.get("token");
  const authenticated = token ? true : false;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact={true} render={() => <LoginContainer />} />
        <AuthRoute
          path="/"
          authenticated={authenticated}
          render={() => <Base />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
