import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Switch} from "@material-ui/core";
import styles from "./header.module.css"
import Button from "@material-ui/core/Button";

import {observer} from "mobx-react-lite";
import Auther from "../../Store/Auther";
import userProfile from "../../Store/Profile"

const dark = '85%'
const light = '0'

function setTheme(theme){
    document.documentElement.style.setProperty("--invert", theme)
}

const isDark = (localStorage.getItem('dark') === "true")
isDark ? setTheme(dark) : setTheme(light)

function unAuthorized(){
    return (
        <>
            <ul>
                <Link to={"/login"}><Button>Login</Button></Link>
            </ul>
            <ul>
                <Link to={"/register"}><Button>Register</Button></Link>
            </ul>

        </>
    )
}

function authorized(){
    return (
        <>
            <ul>
                <Link to={"/browse"}><Button>Browse</Button></Link>
            </ul>
            <ul>
                <Link to={"/profile"}><Button>Profile</Button></Link>
            </ul>
            <ul>
                <Link to={"/qwitt"}><Button>Qwitt</Button></Link>
            </ul>
            <ul>
                <Link to={"/"} onClick={logOut}><Button>Log out</Button></Link>
            </ul>
        </>
    )
}

async function logOut(){
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            credentials: 'include'
        }
    }

    await fetch('/api/logout', requestOptions)

    Auther.reset()
    userProfile.reset()

    return (<></>)
}

function Header(){
    let [checked, setChecked] = useState(isDark)

    function handleChange(e){
        setChecked(e.target.checked)
        !checked ? setTheme(dark) : setTheme(light)
        localStorage.setItem('dark', !checked)
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <Link to={"/"}><Button>Home</Button> </Link>
            </ul>

            {Auther.isAuth ? authorized() : unAuthorized()}

            <Switch
                checked={checked}
                onChange={handleChange}
            />
        </nav>
    )
}

export default observer(Header)