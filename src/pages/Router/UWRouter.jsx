import React from "react";
import {Route} from "react-router-dom"
import UWPolicy from "../UW/UWPolicy";
import Lossmanage from "../UW/Lossmanage";
import Underwriting from "../UW/Underwriting";

// TODO : props 뭐 받을지 생각
const UWRouter = (props) => {
    return (
        <>
            <Route path="/uw/underwriting" exact={true} render={props => <Underwriting />} />
            <Route path="/uw/policy" exact={true} render={props => <UWPolicy />} />
            <Route path="/uw/lossmanage" exact={true} render={props => <Lossmanage />} />
        </>
    )
}

export default UWRouter;