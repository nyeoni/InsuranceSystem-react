import React from "react";
import { Route, Redirect } from "react-router-dom"
import Payment from "../Manage/Payment";
import Expiration from "../Manage/Expiration";
import Reimbursement from "../Manage/Reimbursement";
import Termination from "../Manage/Termination";
import Terms from "../Manage/Terms";
import ManagePolicy from "../Manage/ManagePolicy";

// TODO : props 뭐 받을지 생각
const ManageRouter = (props) => {
    return (
        <>
            <Route to="/manage/payment" render={props => <Payment />} />
            <Route to="/manage/expiration" render={props => <Expiration />} />
            <Route to="/manage/reimbursement" render={props => <Reimbursement />} />
            <Route to="/manage/termination" render={props => <Termination />} />
            <Route to="/manage/terms" render={props => <Terms />} />
            <Route to="/manage/policy" render={props => <ManagePolicy />} />
        </>
    )
}

export default ManageRouter;