import React from "react";
import { Route } from "react-router-dom"
import Contract from "../Sales/Contract";
import Client from "../Sales/Client";
import Apply from "../Sales/Apply";
import AddClient from "../Sales/AddClient";

// TODO : props 뭐 받을지 생각
const SalesRouter = (props) => {
    return (
        <>
            <Route path="/sales/contract" exact={true} render={props => <Contract />} />
            <Route path="/sales/client" exact={true} render={props => <Client />} />
            <Route path="/sales/apply" exact={true} render={props => <Apply />} />
            <Route path="/sales/register" exact={true} render={props => <AddClient />} />
        </>
    )
}

export default SalesRouter;
