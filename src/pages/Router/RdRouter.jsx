import React from "react";
import { Route, Redirect } from "react-router-dom"
import Create from "../RD/Create";
import Support from "../RD/Support";
import Manage from "../RD/Manage";

// TODO : props 뭐 받을지 생각
const RdRouter = (props) => {
    return (
        <>
            <Route to="/rd/create" render={props => <Create />} />
            <Route to="/rd/support" render={props => <Support />} />
            <Route to="/rd/manage" render={props => <Manage />} />
        </>
    )
}

export default RdRouter;