import './App.css';
import React, { useState } from 'react';
import { LogIn } from "./LogIn";
import { SignUp } from "./SignUp";
import Flynn from './Flynn';
import Kelly from "./Kelly.js";
function App() {
  const [currForm, setCurrForm] = useState('login');
  const [currState, setCurrState] = useState('locked');
  const [whosPage, changePage] = useState('pie');

const switchPage = (page) => {
  changePage(page);
}

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
    if(whosPage === 'map'){
      return <Flynn onStateSwitch={switchState} onPageSwitch={switchPage}/>
    }
    else{
      return <Kelly onStateSwitch={switchState} onPageSwitch={switchPage}/>
      
    }
    
  }

}

export default App;
