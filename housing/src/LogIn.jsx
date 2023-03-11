import React, { useState } from "react";

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
        // check if the pswd matched the email
        } else {
            setValidP(validPswd => validPswd = false);
        }
    }

    const submitLogin = (i) => {
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
                <h2 className="subTitle">Welcome Back!</h2>
            <form className="login-format" onSubmit={submitLogin}>
                <label for="email">Email </label>
                <input value={email} onChange={(i) => setEmail(i.target.value)} type="email" placeholder="i.e. youremail@gmail.com" id="email" name="email"/>
                <label for="password">Password </label>
                <input value={pswd} onChange={(i) => setPswd(i.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit"> Log In</button>
            </form>
            <button className="link-button" onClick={() => props.onFormSwitch('signup')}>Don't have an account? Sign up here</button>
            <button className="guest-button" onClick={() => props.onStateSwitch('unlocked')}>Continue as Guest</button>
            </div>
        </div>
        </div>

    )
}