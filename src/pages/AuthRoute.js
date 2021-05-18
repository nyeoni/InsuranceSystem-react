import React from "react"
import { Route, Redirect } from "react-router-dom"
import Base from "./Base/Base";

function AuthRoute({ authenticated, component: Component, render, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated ? (
                    render ? (
                        render(props)
                    ) : (
                        <Base {...props} />
                    )
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                )
            }
        />
    )
}

export default AuthRoute