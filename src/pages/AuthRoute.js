import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Base from "./Base/Base";
import { Cookies } from "react-cookie";

function AuthRoute({ component: Component, render, ...rest }) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const authenticated = token ? true : false;

  return authenticated ? <Base /> : <Navigate to="/login" />;
}

export default AuthRoute;
