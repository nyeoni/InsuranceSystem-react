import React from "react";
import { Route } from "react-router-dom"
import Create from "../RD/Create";
import Support from "../RD/Support";
import Manage from "../RD/Manage";

// TODO : props 뭐 받을지 생각
const RdRouter = (props) => {
    return (
        <>
            <Route path="/rd/create" exact={true} render={props => <Create {...props} />} />
            <Route path="/rd/support" exact={true} render={props => <Support {...props} />} />
            <Route path="/rd/manage" exact={true} render={props => <Manage {...props} />} />
        </>
    )
}

export default RdRouter;