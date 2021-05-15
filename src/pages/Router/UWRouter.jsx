import React from "react";
import { Route, Redirect } from "react-router-dom"
import UWPolicy from "../UW/UWPolicy";
import Lossmanage from "../UW/Lossmanage";
import Underwriting from "../UW/Underwriting";

// TODO : props 뭐 받을지 생각
const UWRouter = (props) => {
    return (
        <>
            <Route to="/uw/underwriting" render={props => <Underwriting />} />
            <Route to="/uw/policy" render={props => <UWPolicy />} />
            <Route to="/uw/lossmanage" render={props => <Lossmanage />} />
        </>
    )
}

export default UWRouter;