import React, { useState } from "react";
import {app,db,auth} from "./firebase.js";
import{getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
import{doc, setDoc, collection, query, where, getCountFromServer} from 'firebase/firestore';

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [name, setName] = useState('');
    const [validPswd, setValidP] = useState(false);
    const [validEmail, setValidE] = useState(false);

    const emailCheck = (email) => {
        // make sure that the email is not already associated with an account
        setValidE(validEmail => validEmail = true);
    }

    const pswdCheck = (pswd) => {
        setValidP(validPswd => validPswd = true);
        if(pswd.length < 8){
            alert("Password must contain at least 8 characters");
            setValidP(validPswd => validPswd = false);
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
                setValidP(validPswd => validPswd = false);
            } else if(numCount === 0){
                alert("Password must contain a number");
                setValidP(validPswd => validPswd = false);
            } else if(ULCount === 0){
                alert("Password must contain an uppercase letter");
                setValidP(validPswd => validPswd = false);
            } else if(LLCount === 0){
                alert("Password must contain a lowercase letter");
                setValidP(validPswd => validPswd = false);
            }
        }
    }

    const submitLogin = async (i) => {
        i.preventDefault();
        emailCheck(email);
        pswdCheck(pswd);
        if(validEmail && validPswd){
            if(name && email && pswd) {
                createUserWithEmailAndPassword(auth,email,pswd);
                await setDoc(doc(db, "Users", auth.currentUser.uid),{
                fullName: name,
                income: -1,
                rent: -1,
                transportation: -1,
                food: -1,
                utilities: -1,
                insurance: -1,
                savings: -1,
                entertainment: -1,
                other: -1,
                });
                localStorage.setItem("nameID", name);
                localStorage.setItem("emailID", email);
                localStorage.setItem("pswdID", pswd);
                props.onStateSwitch('unlocked');
            }
        }
    }

    return (
        <div className="App">
            <div className="formatting-container">
                <h2 className="subTitle">Let's Get Started</h2>
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
            <button className="guest-button" onClick={() => props.onStateSwitch('unlocked')}>Continue as Guest</button>
            </div>
        </div>
    )
}