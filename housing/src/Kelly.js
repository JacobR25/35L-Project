import React from 'react';
import './Kelly.css';
import './App.js';
import {Chart} from 'chart.js'
import { getAuth, signOut } from "firebase/auth";
import{doc, updateDoc, getDoc} from 'firebase/firestore';
import {db,auth} from "./firebase.js";
import { useState } from 'react';





function Test1(props) {
    const [monthlyIncome, setMIncome] = useState(0);
    const [rentPercent, setRentPercent] = useState(0);
    const [transportationPercent, setTransPercent] = useState(0);
    const [foodPercent, setFoodPercent] = useState(0);
    const [utilitiesPercent, setUtilitiesPercent] = useState(0);
    const [insurancePercent, setInsurPercent] = useState(0);
    const [savingsPercent, setSavingPercent] = useState(0);
    const [entertainmentPercent, setEntPercent] = useState(0);
    const [otherPercent, setOtherPercent] = useState(0);

    function myFunction() {

        var total = Number(rentPercent)+Number(transportationPercent)+Number(foodPercent)+Number(utilitiesPercent)+Number(insurancePercent)+Number(savingsPercent)+Number(entertainmentPercent)+Number(otherPercent);
        console.log(total);
    
        if(total !== 100){
          window.alert("the total percentages add to 100, not "+total+" you silly");
          return;
        } 
        
        var data1 = [{title: "Rent", value: (monthlyIncome * rentPercent *.01), color: '#F2C4DE'}, {title: "Transportation", value: (monthlyIncome * transportationPercent*.01), color: '#71B1D9'}, {title: "Food", value: (monthlyIncome * foodPercent*.01), color: '#AED8F2'}, {title: "Utilities", value: (monthlyIncome * utilitiesPercent*.01), color: '#F2CDC4'},          {title: "Insurance", value: (monthlyIncome * insurancePercent*.01), color: '#A9B5D9'},          {title: "Savings", value: (monthlyIncome * savingsPercent*.01), color: '#F2A477'},          {title: "Entertainment", value: (monthlyIncome * entertainmentPercent*.01),color: '#5F9595'},          {title: "Other", value: (monthlyIncome * otherPercent*.01), color: '#D9BCF2'},        ];
        // check if canvas already exists, and remove if it does
        new Chart("myChart", {
            type: "pie",
            data: {
              labels: data1.title,
              datasets: [{
                backgroundColor: data1.color,
                data: data1.value
              }]
            },
            options: {
              title: {
                display: true,
                text: "World Wide Wine Production"
              }
            }
          });
        return( <>
        <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
        </>
        );
    }

    return(<>
        <title>Budget Calculator</title>
      <h1>Budget Calculator</h1>
      <p>Enter your monthly income in the first box, and percentages(0-100) for each category</p>
      <p>After clicking submit, move the mouse over the pie chart to see how much you should spend in each category.</p><br />
      <body>
        <form>
          <label for="monthlyIncome">Monthly Income: </label>
          <input type="number" value={monthlyIncome} onChange={(i) => setMIncome(i.target.value)}id="monthlyIncome" name="monthlyIncome" placeholder='0'/*style="margin-left:10px"*/ /> <hr /><br />
          
          <label for="rent">Rent: </label>
          <input type="number" value={rentPercent} onChange={(i) => setRentPercent(i.target.value)} id="rent" name="rent" placeholder='0'/*style="margin-left:85px"*/ /> <br /><br />
          
          <label for="transportation">Transportation: </label>
          <input type="number" value={transportationPercent} onChange={(i) => setTransPercent(i.target.value)} id="transportation" placeholder='0'/*style="margin-left:20px"*/ name="transportation" /> <br /><br />
          
          <label for="food">Food: </label>
          <input type="number" value={foodPercent} onChange={(i) => setFoodPercent(i.target.value)} id="food" name="food" placeholder='0'/*style="margin-left:80px"*/ /><br /><br />
          
          <label for="utilities">Utilities: </label>
          <input type="number" value={utilitiesPercent} onChange={(i) => setUtilitiesPercent(i.target.value)} id="utilities" placeholder='0'/*style="margin-left:60px"*/ name="utilities" /><br /><br />
          
          <label for="insurance">Insurance: </label>
          <input type="number" value={insurancePercent} onChange={(i) => setInsurPercent(i.target.value)} id="insurance" name="insurance" placeholder='0'/*style="margin-left:50px"*/ /><br /><br />
          
          <label for="savings">Savings: </label>
          <input type="number" value={savingsPercent} onChange={(i) => setSavingPercent(i.target.value)} id="savings" name="savings" placeholder='0'/*style="margin-left:60px"*/ /><br /><br />
          
          <label for="entertainment">Entertainment: </label>
          <input type="number" value={entertainmentPercent} onChange={(i) => setEntPercent(i.target.value)} id="entertainment" name="entertainment" placeholder='0'/*style="margin-left:20px"*/ /><br /><br />
          
          <label for="other">Other: </label>
          <input type="number" value={otherPercent} onChange={(i) => setOtherPercent(i.target.value)} id="other" /*style="margin-left:75px"*/ name="other" /><br /><br />
          
          
        </form>
        <button onClick={myFunction}>Submit</button>
        </body>
</>);
}

export default Test1;