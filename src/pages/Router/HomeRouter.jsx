import React from "react";
import { Route } from "react-router-dom"
import Board from "../Home/Board";
import Home from "../Home/Home";
import BoardDetail from "../Home/BoardDetail";

// TODO : props 뭐 받을지 생각
const HomeRouter = (props) => {
    return (
        <>
            <Route path="/home" exact={true} render={props => <Home />} />
            <Route path="/home/board" exact={true} render={props => <Board />} />
            <Route path="/home/board/:id" exact={true} render={props => <BoardDetail />} />
        </>
    )
}

export default HomeRouter;