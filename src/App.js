import React from "react";
import {BrowserRouter, Switch, Route, Link, Redirect} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { signIn } from "./pages/Auth";
import {useState} from "react";
import Base from "./pages/Base";

function App() {
    const [user, setUser] = useState({
        id: '', password: '', name: ''
    });
    const authenticated = user.name != ''

    const [info, setInfo] = useState({
        id: '',
        password: ''
    });

    const {id, password} = info;

    const onChange = e => {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    const login = () => {
        setUser(signIn({id, password}));
        console.log(user);
        if (authenticated) {
            alert("됐는데에에!!");
            console.log(user);
            return (<Redirect to="/" />);
        }
        else {
            console.log("nononon");
        }
    };

    const logout = () => setUser(null);

    return (
        <BrowserRouter>
            <main className="App">
                <Switch>
                    <Route path="/login" exact={true} render={props => <Login id={id} password={password} onChange={onChange} login={login}/>} />
                    <Route path="/" exact={true} render={props => true ? <Profile /> : (<Redirect
                        to={{ pathname: "/login"}} />) } />
                    <Route paht="/home" exact={true} render={() => <Base />} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;