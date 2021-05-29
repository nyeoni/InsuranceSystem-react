import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import Login from "./Login";
import {loginUser} from "../../redux/modules/user";

function LoginContainer() {
    const dispatch = useDispatch();
    const onSetUser = user => dispatch(loginUser(user));

    return (
        <Login onSetUser={onSetUser}/>
    );
}

export default LoginContainer;