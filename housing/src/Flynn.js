import React from 'react';
import './App.css';

import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import californiaCounties from './California_County_Boundaries.geojson';



const CaliforniaMap = () => {
  const [hoverName, setTooltipContent] = React.useState('No county hovered');
  const [clickedName, setClickedName] = React.useState('No county clicked yet');
  const handleCountyHover = (CountyName) => {
    console.log(CountyName);
    setTooltipContent(CountyName);
  };
  const handleMouseDown = (CountyName) => {
    //call function to display the county rent info
    setClickedName(CountyName);
  };
  const handleCountyLeave = () => {
    setTooltipContent('No county hovered');
  };
  const isHovered = (name) => {
    if(name===hoverName){
      return 'red';
    }
    return 'pink';
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ position: "relative", width: "50%", height: "50%" }}>
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ center: [0, 40], scale: 2300 }}
          width={500}
          height={500}
          style={{ display: "block" }}
        >
          <Geographies
            geography={californiaCounties}
            style={{ transform: "translate(600px, 10px)" }}
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleCountyHover(geo.properties.CountyName)}
                  onMouseLeave={handleCountyLeave}
                  onMouseDown={() => handleMouseDown(geo.properties.CountyName)}
                  fill={isHovered(geo.properties.CountyName)}
                  stroke="#FFF"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      <div style={{ marginLeft: "20px" }}>
        The county you are hovering is: {hoverName} <br></br>
        You just clicked: {clickedName}
      </div>
    </div>
  );
};


function test1() {
    return (
      <div>
        <header className="App-header">
          <p>
            Flynn testing here
          </p>
          
        </header>
        <div ><CaliforniaMap/></div>
      </div>
    );
  }
  
  export default test1;
