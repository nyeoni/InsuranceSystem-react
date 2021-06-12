import React from "react";
import {Route} from "react-router-dom"
import UWPolicy from "../UW/UWPolicy";
import AddUWPolicy from "../UW/AddUWPolicy";
import UWPolicyDetail from "../UW/UWPolicyDetail";
import Underwriting from "../UW/Underwriting";
import UWDetail from "../UW/UWDetail";

// TODO : props 뭐 받을지 생각
const UWRouter = (props) => {
    return (
        <>
            <Route path="/uw/underwriting" exact={true} render={props => <Underwriting {...props}/>}/>
            <Route path="/uw/underwriting/:id" exact={true} render={props => <UWDetail {...props}/>}/>
            <Route path="/uw/policy" exact={true} render={props => <UWPolicy {...props}/>}/>
            <Route path="/uw/policy/addpolicy" exact={true} render={props => <AddUWPolicy {...props}/>}/>
            <Route path="/uw/policy/:id" exact={true} render={props => <UWPolicyDetail {...props}/>}/>
        </>
    )
}

export default UWRouter;