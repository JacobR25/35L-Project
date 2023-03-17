import React, { useState } from "react";
import {app,db,auth} from "./firebase.js";
import{getAuth, signInWithEmailAndPassword} from 'firebase/auth';


export const LogIn = (props) => {
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [validPswd, setValidP] = useState(false);
    const [validEmail, setValidE] = useState(false);

    const emailCheck = (email) => {
        // chceck if the email is already in our data base
        setValidE(validEmail => validEmail = true);
    }

    const pswdCheck = (pswd) => {
        setValidP(validPswd => validPswd = true);
        emailCheck(email);
        if(validEmail){

        } else {
            setValidP(validPswd => validPswd = false);
        }
    }




    const submitLogin = (i) => {
        //const auth = getAuth();
        //const user = auth.currentUser;
        //console.log(user);
        signInWithEmailAndPassword(auth,email,pswd).catch((error)=>{window.alert(error.message); return; });
        //const auth2 = getAuth();
        //const user2 = auth.currentUser;
        //console.log(user2);
        i.preventDefault();
        pswdCheck(pswd);
        if(validPswd){
            if(email && pswd) {
                localStorage.setItem("emailID", email);
                localStorage.setItem("pswdID", pswd);
                props.onStateSwitch('unlocked');
            }
        }
    }
    

    return (
        <div>
        <div className="App">
            <div className="formatting-container">
            <h1 className="title">House Helpers</h1>
                <h2 className="subTitle">Welcome Back!</h2>
            <form onSubmit={submitLogin}>
                <label className="label-style" for="email">Email </label>
                <br></br>
                <input className="input-style" value={email} onChange={(i) => setEmail(i.target.value)} type="email" placeholder="i.e. youremail@gmail.com" id="email" name="email"/>
                <br></br>
                <label className="label-style" for="password">Password </label>
                <br></br>
                <input className="input-style" value={pswd} onChange={(i) => setPswd(i.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <br></br>
                <button type="submit"> Log In</button>
            </form>
            <button className="link-button" onClick={() => props.onFormSwitch('signup')}>Don't have an account? Sign up here</button>
            <button className="guest-button" onClick={() => props.onStateSwitch('unlocked')}>Continue as Guest</button>
            </div>
        </div>
        </div>

    )
}