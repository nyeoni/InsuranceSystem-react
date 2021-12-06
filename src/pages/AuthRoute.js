import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Base from "./Base/Base";

function AuthRoute({ authenticated, component: Component, render, ...rest }) {
  return authenticated ? <Base /> : <Navigate to="/login" />;
}

export default AuthRoute;
