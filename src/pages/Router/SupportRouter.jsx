import React from "react";
import { Route, Redirect } from "react-router-dom"
import Accident from "../Support/Accident";
import Compensate from "../Support/Compensate";
import Cooperation from "../Support/Cooperation";
import Evalution from "../Support/Evalution";

// TODO : props 뭐 받을지 생각
const SupportRouter = (props) => {
    return (
        <>
            <Route to="/support/accident" render={props => <Accident />} />
            <Route to="/support/compensate" render={props => <Compensate />} />
            <Route to="/support/cooperation" render={props => <Cooperation />} />
            <Route to="/support/evalution" render={props => <Evalution />} />
        </>
    )
}

export default SupportRouter;