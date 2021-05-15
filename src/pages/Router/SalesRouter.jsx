import React from "react";
import { Route, Redirect } from "react-router-dom"
import Contract from "../Sales/Contract";
import Client from "../Sales/Client";
import Apply from "../Sales/Apply";

// TODO : props 뭐 받을지 생각
const SalesRouter = (props) => {
    return (
        <>
            <Route to="/sales/contract" render={props => <Contract />} />
            <Route to="/sales/client" render={props => <Client />} />
            <Route to="/sales/apply" render={props => <Apply />} />
        </>
    )
}

export default SalesRouter;