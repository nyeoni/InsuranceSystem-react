import React from "react";
import { Route } from "react-router-dom"
import Accident from "../Support/Accident";
import Compensate from "../Support/Compensate";
import Cooperation from "../Support/Cooperation";
import Evalution from "../Support/Evalution";

// TODO : props 뭐 받을지 생각
const SupportRouter = (props) => {
    return (
        <>
            <Route path="/support/accident" exact={true} render={props => <Accident />} />
            <Route path="/support/compensate" exact={true} render={props => <Compensate />} />
            <Route path="/support/cooperation" exact={true} render={props => <Cooperation />} />
            <Route path="/support/evalution" exact={true} render={props => <Evalution />} />
        </>
    )
}

export default SupportRouter;