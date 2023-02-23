/* ADD THIS TO HTML
<!DOCTYPE html>
<html>
  <head>
      <title>JavaScript Pie Chart</title>
      <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-core.min.js"></script>
      <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-pie.min.js"></script>
  </head>
  <body>
    <div id="container" style="width: 100%; height: 100%"></div>
    <script>
        <!-- chart code will be here -->
    </script>
  </body>
</html>
*/


function topRentCalc(price){
    return price * .011
}
function btmRentCalc(price){
    return price * .008
}
function rentRangeGivenHouseCost(price){
    return "$" + (price * .008) + " - $" + (price * .011)
}
function percentBudgetReturn(monthlyIncome, percent){
    return monthlyIncome * percent
}
function fullBudget(monthlyIncome){
    //not sure if needed
}
function whatHouseCanIAfford(monthlyRentBudget){
    
}
anychart.onDocumentReady(function() {

    // set the data
    var rent = 1000; //later will be grabbed from what the user wants
    
    //just doing budget to map, make it fully customizable
    //here we will get the percentages that they want
    rentPercent = .10; //will actually get from input box
    transportationPercent = .10; //will actually get from input box
    foodPercent = .20;
    utilitiesPercent = .10;
    insurancePercent = .20;
    savingsPercent = .30;
    entertainmentPercent = .5;
    otherPercent = .5;
    monthlyIncome = 10000; //will actually come from client side
    var data = [
        {x: "Rent", value: percentBudgetReturn(monthlyIncome, rentPercent)},
        {x: "Transportation", value: percentBudgetReturn(monthlyIncome, transportationPercent)},
        {x: "Food", value: percentBudgetReturn(monthlyIncome, foodPercent)},
        {x: "Utilities", value: percentBudgetReturn(monthlyIncome, utilitiesPercent)},
        {x: "Insurance", value: percentBudgetReturn(monthlyIncome, insurancePercent)},
        {x: "Savings", value: percentBudgetReturn(monthlyIncome, savingsPercent)},
        {x: "Entertainment", value: percentBudgetReturn(monthlyIncome, entertainmentPercent)},
        {x: "Other", value: percentBudgetReturn(monthlyIncome, otherPercent)}
    ];
  
    // create the chart
    var chart = anychart.pie();
  
    // set the chart title
    chart.title("Population by Race for the United States: 2010 Census");
  
    // add the data
    chart.data(data);
  
    // display the chart in the container
    chart.container('container');
    chart.draw();
  
  });