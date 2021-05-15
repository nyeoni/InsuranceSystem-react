import React from "react";
import { Route, Redirect } from "react-router-dom"
import Board from "../Home/Board";
import HMinsu from "../Home/Himinsu";
import Department from "../Home/Department";

// TODO : props 뭐 받을지 생각
const HomeRouter = (props) => {
    return (
        <>
            <Route to="/home/board" render={props => <Board />} />
            <Route to="/home/department" render={props => <Department />} />
            <Route to="/home/hminsu" render={props => <HMinsu />} />
        </>
    )
}

export default HomeRouter;