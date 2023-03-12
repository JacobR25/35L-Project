import './App.css';
import React, { useState } from 'react';
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import Flynn from './Flynn';

function App() {
  const [currForm, setCurrForm] = useState('login');
  const [currState, setCurrState] = useState('locked');

  const switchForm = (formName) => {
    setCurrForm(formName);
  }

  const switchState = (state) => {
    setCurrState(state);
  }

  if(currState === "locked") {
    if(currForm === "login"){
      return <LogIn onFormSwitch={switchForm} onStateSwitch={switchState}/>
    } else {
      return <SignUp onFormSwitch={switchForm} onStateSwitch={switchState}/>
    }
  } else {
    // this will return kellys page
    return <Flynn onStateSwitch={switchState}/>
  }

}

export default App;
