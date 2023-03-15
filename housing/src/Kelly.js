import React from 'react';
import './Kelly.css';
import './App.js';
import "https://cdn.jsdelivr.net/npm/react@17.0.2/umd/react.production.min.js";
import "https://cdn.jsdelivr.net/npm/react-dom@17.0.2/umd/react-dom.production.min.js";
import "https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js";
import {Chart} from "https://cdn.jsdelivr.net/npm/react-chartjs-2@3.0.4/dist/react-chartjs-2.min.js";
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
        //event.preventDefault();
        // var monthlyIncome = parseFloat(document.getElementById("monthlyIncome").value);
        // var rentPercent = parseFloat(document.getElementById("rent").value);
        // var transportationPercent = parseFloat(document.getElementById("transportation").value);
        // var foodPercent = parseFloat(document.getElementById("food").value);
        // var utilitiesPercent = parseFloat(document.getElementById("utilities").value);
        // var insurancePercent = parseFloat(document.getElementById("insurance").value);
        // var savingsPercent = parseFloat(document.getElementById("savings").value);
        // var entertainmentPercent = parseFloat(document.getElementById("entertainment").value);
        // var otherPercent = parseFloat(document.getElementById("other").value);
        var total = rentPercent+transportationPercent+foodPercent+utilitiesPercent+insurancePercent+savingsPercent+entertainmentPercent+otherPercent;
        console.log(total);
    
        if(total !== 100){
          window.alert("the total percentages add to 100, not "+total+" you silly");
          return;
        } 
        //just doing budget to map, make it fully customizable
        //here we will get the percentages that they want
        /*
        var rentPercent = document.getElementById("rent").value; //will actually get from input box
        var transportationPercent = document.getElementById("transportation").value; //will actually get from input box
        var foodPercent = document.getElementById("food").value;
        var utilitiesPercent = document.getElementById("utilities").value;
        var insurancePercent = document.getElementById("insurance").value;
        var savingsPercent = document.getElementById("savings").value;
        var entertainmentPercent = document.getElementById("entertainment").value;*/
        
        
        var data = [          {title: "Rent", value: (monthlyIncome * rentPercent *.01), color: '#F2C4DE'},          {title: "Transportation", value: (monthlyIncome * transportationPercent*.01), color: '#71B1D9'},          {title: "Food", value: (monthlyIncome * foodPercent*.01), color: '#AED8F2'},          {title: "Utilities", value: (monthlyIncome * utilitiesPercent*.01), color: '#F2CDC4'},          {title: "Insurance", value: (monthlyIncome * insurancePercent*.01), color: '#A9B5D9'},          {title: "Savings", value: (monthlyIncome * savingsPercent*.01), color: '#F2A477'},          {title: "Entertainment", value: (monthlyIncome * entertainmentPercent*.01),color: '#5F9595'},          {title: "Other", value: (monthlyIncome * otherPercent*.01), color: '#D9BCF2'},        ];
        // check if canvas already exists, and remove if it does
        var existingCanvas = document.getElementById('myChart');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        // create the chart
        var canvas = document.createElement('canvas');
        canvas.id = 'myChart';
        canvas.width = 400;
        canvas.height = 400;
        document.body.appendChild(canvas);
        var ctx = canvas.getContext('2d');
        var chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.map(item => item.title),
            datasets: [{
            data: data.map(item => item.value),
            backgroundColor: data.map(item => item.color)
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
        }
        });
    }

    return(<>
        <title>Budget Calculator</title>
      <h1>Budget Calculator</h1>
      <p>Enter your monthly income in the first box, and percentages(0-100) for each category</p>
      <p>After clicking submit, move the mouse over the pie chart to see how much you should spend in each category.</p><br />
      <body>
        <form onSubmit={myFunction()}>

          <label for="monthlyIncome">Monthly Income: </label>
          <input type="text" value={monthlyIncome} onChange={(i) => setMIncome(i.target.value)}id="monthlyIncome" name="monthlyIncome" /*style="margin-left:10px"*/ /> <hr /><br />
          
          <label for="rent">Rent: </label>
          <input type="text" value={rentPercent} onChange={(i) => setRentPercent(i.target.value)} id="rent" name="rent" /*style="margin-left:85px"*/ /> <br /><br />
          
          <label for="transportation">Transportation: </label>
          <input type="text" value={transportationPercent} onChange={(i) => setTransPercent(i.target.value)} id="transportation" /*style="margin-left:20px"*/ name="transportation" /> <br /><br />
          
          <label for="food">Food: </label>
          <input type="text" value={foodPercent} onChange={(i) => setFoodPercent(i.target.value)} id="food" name="food" /*style="margin-left:80px"*/ /><br /><br />
          
          <label for="utilities">Utilities: </label>
          <input type="text" value={utilitiesPercent} onChange={(i) => setUtilitiesPercent(i.target.value)} id="utilities" /*style="margin-left:60px"*/ name="utilities" /><br /><br />
          
          <label for="insurance">Insurance: </label>
          <input type="text" value={insurancePercent} onChange={(i) => setInsurPercent(i.target.value)} id="insurance" name="insurance" /*style="margin-left:50px"*/ /><br /><br />
          
          <label for="savings">Savings: </label>
          <input type="text" value={savingsPercent} onChange={(i) => setSavingPercent(i.target.value)} id="savings" name="savings" /*style="margin-left:60px"*/ /><br /><br />
          
          <label for="entertainment">Entertainment: </label>
          <input type="text" value={entertainmentPercent} onChange={(i) => setEntPercent(i.target.value)} id="entertainment" name="entertainment" /*style="margin-left:20px"*/ /><br /><br />
          
          <label for="other">Other: </label>
          <input type="text" value={otherPercent} onChange={(i) => setOtherPercent(i.target.value)} id="other" /*style="margin-left:75px"*/ name="other" /><br /><br />
          
          <input type="submit" value="Submit" /><br /><br />
          <div id="chart"></div>
        </form>
        </body>
</>);
}

export default Test1;