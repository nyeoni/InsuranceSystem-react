import React from "react";
import {BrowserRouter, Switch, Route, Link, Redirect, useHistory, withRouter} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { signIn } from "./pages/Auth";
import {useState} from "react";
import Base from "./pages/Base";
import apiAxios from "./apiAxios";
import AuthRoute from "./pages/AuthRoute";

function App() {
    const [user, setUser] = useState({
        name: '', department: '', phoneNumber: '', role: '', email: ''
    });
    const authenticated = user.name != ''

    const [info, setInfo] = useState({
        id: '',
        password: ''
    });
    const history = useHistory();

    const {id, password} = info;

    const onChange = e => {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    };

    function validateUser(data) {
        if (!(data.error))
        {
            setUser(
                {
                    name: data.name,
                    department: data.department,
                    phoneNumber: data.phoneNumber,
                    role: data.role,
                    email: data.email
                }
            )
        }
        else
        {
            alert("아이디 혹은 비밀번호가 잘못되었습니다!");
        }
    }

    const login = () => {
        // setUser(signIn({id, password}));
        apiAxios('employee/login', validateUser, info)
        console.log(user);
        if (authenticated) {
            alert("됐는데에에!!");
            console.log(user);
            // <Route path="/" exact={true} render={props => true ? <Profile /> : (<Redirect to={{ pathname: "/login"}} />) } />
            history.push("/home");
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

export default withRouter(App);