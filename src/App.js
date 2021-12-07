import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoute from "./pages/AuthRoute";
import { Cookies } from "react-cookie";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Board from "./pages/Home/Board";
import BoardDetail from "./pages/Home/BoardDetail";
import Create from "./pages/RD/Create";
import Support from "./pages/RD/Support";
import Manage from "./pages/RD/Manage";
import ManageDetail from "./pages/RD/ManageDetail";
import SupportDetail from "./pages/RD/SupportDetail";
import Contract from "./pages/Sales/Contract/Contract";
import Client from "./pages/Sales/Client/Client";
import Apply from "./pages/Sales/Apply";
import Register from "./pages/Sales/Register";
import UWPolicy from "./pages/UW/UWPolicy";
import AddUWPolicy from "./pages/UW/AddUWPolicy";
import UWPolicyDetail from "./pages/UW/UWPolicyDetail";
import Lossmanage from "./pages/UW/Lossmanage";
import Underwriting from "./pages/UW/UnderWriting/Underwriting";
import UWDetail from "./pages/UW/UWDetail";
import ManageModify from "./pages/RD/ManageModify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact={true} element={<Login />} />
        <Route path="/*" element={<AuthRoute />}>
          <Route path="" element={<Home />} />
          <Route path="board" element={<Board />} />
          <Route path="board/:id" exact element={<BoardDetail />} />
          <Route path="rd/create" element={<Create />} />
          <Route path="rd/support" element={<Support />} />
          <Route path="rd/support/:id" element={<SupportDetail />} />
          <Route path="rd/manage" element={<Manage />} />
          <Route path="rd/manage/:id" element={<ManageModify />} />
          <Route path="sales/contract" element={<Contract />} />
          <Route path="sales/client" element={<Client />} />
          <Route path="sales/apply" element={<Apply />} />
          <Route path="sales/register" element={<Register />} />
          <Route path="uw/underwriting" element={<Underwriting />} />
          <Route path="uw/underwriting/:id" element={<UWDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
