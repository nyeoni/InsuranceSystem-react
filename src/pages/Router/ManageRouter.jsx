import React from "react";
import { Routes, Route } from "react-router-dom";
import Payment from "../Manage/Payment";
import Expiration from "../Manage/Expiration";
import Reimbursement from "../Manage/Reimbursement";
import Termination from "../Manage/Termination";
import Terms from "../Manage/Terms";
import ManagePolicy from "../Manage/ManagePolicy";

// TODO : props 뭐 받을지 생각
const ManageRouter = (props) => {
  return (
    <Routes>
      <Route
        path="/manage/payment"
        exact={true}
        render={(props) => <Payment />}
      />
      <Route
        path="/manage/expiration"
        exact={true}
        render={(props) => <Expiration />}
      />
      <Route
        path="/manage/reimbursement"
        exact={true}
        render={(props) => <Reimbursement />}
      />
      <Route
        path="/manage/termination"
        exact={true}
        render={(props) => <Termination />}
      />
      <Route path="/manage/terms" exact={true} render={(props) => <Terms />} />
      <Route
        path="/manage/policy"
        exact={true}
        render={(props) => <ManagePolicy />}
      />
    </Routes>
  );
};

export default ManageRouter;
