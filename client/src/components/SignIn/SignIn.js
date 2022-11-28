import React from 'react'
import { useState } from 'react';
import axios from "axios";

function SignIn() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSignin = (e) => {
        e.preventDefault();
        const user = {username, password};
        axios ( {
            method: "POST",
            url: `${process.env.REACT_APP_NOTEAPP_BACKEND}/users/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        }).then((res) => {
            console.log("Logged In successfully");
            const token = res.data.token;
            localStorage.setItem("token", token);
        }).catch((e) => {
            alert("Authentication Failed");
            setUsername("");
            setPassword("");
        })
    }


    const handleRegister = (e) => {
        e.preventDefault();
        const user = {username, password};
        axios ( {
            method: "POST",
            url: `${process.env.REACT_APP_NOTEAPP_BACKEND}/users/register`,
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        }).then((res) => {
            console.log("Registered successfully");
            localStorage.setItem("token", res.data.token);
        }).catch((e) => {
            alert(e);
            setUsername("");
            setPassword("");
        })
    }


    

  return (
    <div className='Signin'>
        <h1 className='SigninHead'>Personal Note</h1>
        <div className='SigninForm'>
            <form>
                <div className='FormUsername'>
                    <span className='FormLabel'>Username</span>
                    <input type="text" className='formInput' required value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                </div>
                <div className='FormPassword'>
                    <span className='FormLabel'>Password</span>
                    <input type="password" className='formInput' required value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </div>
                <div className='FormBtns'>
                    <button className='Btns' onClick={handleSignin}>Sign In</button>
                    <button className='Btns registerBtn' onClick={handleRegister}>Sign Up</button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default SignIn