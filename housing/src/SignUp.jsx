import React, { useState } from "react";

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [name, setName] = useState('');
    const [validPswd, setValid] = useState(false);

    const pswdCheck = (pswd) => {
        setValid(validPswd => validPswd = true);
        if(pswd.length < 8){
            alert("Password must contain at least 8 characters");
            setValid(validPswd => validPswd = false);
        } else {
            var LLCount = 0;
            var ULCount = 0;
            var numCount = 0;
            var otherCount = 0;
            for(var i = 0; i < pswd.length; i++){
                if(pswd[i] >= "a" && pswd[i] <= "z"){
                    LLCount++;
                } else if(pswd[i] >= "A" && pswd[i] <= "Z"){
                    ULCount++;
                } else if(pswd[i] >= 0 && pswd[i] <= 9){
                    numCount++;
                } else {
                    otherCount++;
                }
            }
            if(otherCount === 0){
                alert("Password must contain a special character");
                setValid(validPswd => validPswd = false);
            } else if(numCount === 0){
                alert("Password must contain a number");
                setValid(validPswd => validPswd = false);
            } else if(ULCount === 0){
                alert("Password must contain an uppercase letter");
                setValid(validPswd => validPswd = false);
            } else if(LLCount === 0){
                alert("Password must contain a lowercase letter");
                setValid(validPswd => validPswd = false);
            }
        }
    }

    const submitLogin = (i) => {
        i.preventDefault();
        pswdCheck(pswd);
        if(validPswd){
            if(name && email && pswd) {
                localStorage.setItem("nameID", name);
                localStorage.setItem("emailID", email);
                localStorage.setItem("pswdID", pswd);
                alert("Account Created: Welcome to House Helpers!");
            }
        }
    }

    return (
        <div className="formatting-container">
        <form className="signup-format" onSubmit={submitLogin}>
            <label>Full Name</label>
            <input value={name} onChange={(i) => setName(i.target.value)} name="name" id="name" placeholder="i.e. John Smith" />
            <label for="email">Email </label>
            <input value={email} onChange={(i) => setEmail(i.target.value)} type="email" placeholder="i.e. youremail@gmail.com" id="email" name="email"/>
            <label for="password">Password </label>
            <input value={pswd} onChange={(i) => setPswd(i.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit"> Log In</button>
        </form>
        <button className="link-button" onClick={() => props.onFormSwitch('login')}>Already have an account? Sign in here</button>
        </div>

    )
}