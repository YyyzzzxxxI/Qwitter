import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route, Link, Redirect,
} from "react-router-dom";

import Header from "./components/pages/Header/Header";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Main from "./components/pages/Main/Main";
import Browse from "./components/pages/Browse/Browse";
import Profile from "./components/pages/Profile/Profile";
import Qwitt from "./components/pages/Qwitt/Qwitt";

import {observer} from "mobx-react-lite";
import Auther from "./components/Store/Auther";
import userProfile from "./components/Store/Profile";

function unAuthorized(){
    return (
        <>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/register">
                <Register/>
            </Route>
        </>
    )
}

function authorized(){
    return (
        <>
            <Route exact path="/browse">
                {<Browse/>}
            </Route>

            <Route exact path="/profile">
                {<Profile/>}
            </Route>
            <Route exact path="/qwitt">
                {<Qwitt/>}
            </Route>
        </>
    )
}

function App(){
    useEffect(()=>{
        Auther.checkAuth()
        userProfile.getUser()
    },[])

    return (
        <div className={"wrapper"}>
            <Router>
                <Header/>
                {Auther.isAuth ? authorized() : unAuthorized()}
                <Switch>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default observer(App);
