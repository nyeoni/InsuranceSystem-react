import React from "react";
import { Route } from "react-router-dom"
import Compensate from "../Support/Compensate";
import Cooperation from "../Support/Cooperation";
import Evalution from "../Support/Evaluation";
import Claim from "../Support/Claim";

// TODO : props 뭐 받을지 생각
const SupportRouter = (props) => {
    return (
        <>
            <Route path="/support/accident" exact={true} render={props => <Claim />} />
            <Route path="/support/compensate" exact={true} render={props => <Compensate />} />
            <Route path="/support/cooperation" exact={true} render={props => <Cooperation />} />
            <Route path="/support/evalution" exact={true} render={props => <Evalution />} />
        </>
    )
}

export default SupportRouter;