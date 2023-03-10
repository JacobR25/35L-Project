import React, { useState } from "react";

export const LogIn = () => {
    const [email, setEmail] = useState('');
    const [pswd, setPswd] = useState('');

    return (
        <form>
            <label for="email">Email </label>
            <input value={email} onChange={(i) => setEmail(i.target.value)} type="email" placeholder="i.e. youremail@gmail.com" id="email" name="email"/>
            <label for="password">Password </label>
            <input value={pswd} onChange={(i) => setPswd(i.target.value)} type="password" placeholder="********" id="password" name="password"/>
            <button type="submit"> Log In</button>
        </form>
    )
}