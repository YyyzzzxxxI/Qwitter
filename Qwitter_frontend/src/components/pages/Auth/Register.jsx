import React, {useState} from 'react'
import {Button, Input} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import art from "../../img/art.png";
import styles from "./auth.module.css"

import {useHistory} from "react-router-dom";

function createAlert(status, text){
    if (status === "") return (<></>)
    return (<Alert severity={status}>{text}</Alert>)
}

export default function Register(){
    let username, password

    const [alert, setAlert] = useState(createAlert("", ""))
    const history = useHistory();

    function submit(){

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({username: username, password: password}),
        }

        fetch('/api/register', requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.error || data.message === "Missing credentials"){
                   setAlert(createAlert("error", data.error))
                }
                else {
                    setAlert(createAlert("success", data.message + "! \nRedirecting to login..."))
                    setTimeout(()=>{
                        history.push(`/login`);
                    }, 5000)
                }
            })

    }


    function handlerU(e){
        username = e.target.value
    }

    function handlerP(e){
        password = e.target.value
    }


    return (
        <div className={styles.container}>
            <form className={styles.container + ' ' + styles.auth}>
                <img src={art} alt={"art"}/>
                <label>
                    <Input placeholder="Username" name="username" onChange={handlerU} required/>
                </label>

                <label>
                    <Input placeholder="Password" type="password" name="password" onChange={handlerP} required/>
                </label>

                <Button onClick={submit} color="primary" variant="outlined">Register</Button>
                {alert}
            </form>
        </div>
    )

}