import React from "react";
import { Route } from "react-router-dom"
import AddClaim from "../Support/AddClaim";
import Claim from "../Support/Claim";
import Compensate from "../Support/Compensate";
import Cooperation from "../Support/Cooperation";
import Evalution from "../Support/Evaluation";

// TODO : props 뭐 받을지 생각
const SupportRouter = (props) => {
    return (
        <>
            <Route path="/support/accident" exact={true} render={props => <Claim {...props}/>} />
            <Route path="/support/accident/addclaim" exact={true} render={props => <AddClaim {...props}/>} />
            <Route path="/support/compensate" exact={true} render={props => <Compensate {...props}/>} />
            <Route path="/support/cooperation" exact={true} render={props => <Cooperation {...props}/>} />
            <Route path="/support/evalution" exact={true} render={props => <Evalution {...props} />} />
        </>
    )
}

export default SupportRouter;