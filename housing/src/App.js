import './App.css';
import React, { useState } from 'react';
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";

function App() {
  const [currForm, setCurrForm] = useState('login');

  const switchForm = (formName) => {
    setCurrForm(formName);
  }

  return (
    <div className="App">
      {
        currForm === "login" ? <LogIn onFormSwitch={switchForm} /> : <SignUp onFormSwitch={switchForm} />
      }
        
    </div>
  );
}

export default App;
