import React, { useState } from "react";

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');
    const [name, setName] = useState('');

    const submitLogin = (i) => {
        i.preventDefault();
        console.log(email);
    }

    return (
        <div>
        <form onSubmit={submitLogin}>
            <label>Full Name</label>
            <input value={name} onChange={(i) => setName(i.target.value)} name="name" id="name" placeholder="i.e. John Smith" />
            <label for="email">Email </label>
            <input value={email} onChange={(i) => setEmail(i.target.value)} type="email" placeholder="i.e. youremail@gmail.com" id="email" name="email"/>
            <label for="password">Password </label>
            <input value={pswd} onChange={(i) => setPswd(i.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit"> Log In</button>
        </form>
        <button onClick={() => props.onFormSwitch('login')}>Already have an account? Sign in here</button>
        </div>

    )
}