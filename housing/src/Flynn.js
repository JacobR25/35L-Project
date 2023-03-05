import map from './images/CAMap.png';
import React from 'react';
import './App.css';

import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import californiaCounties from './California_County_Boundaries.geojson';
const ImageStyle={
  width:`500px`,
  float:'right'
}


const CaliforniaMap = () => {
  const [hoverName, setTooltipContent] = React.useState('No county hovered');

  const handleCountyHover = (CountyName) => {
    console.log(CountyName);
    setTooltipContent(CountyName);
  };

  const handleCountyLeave = () => {
    setTooltipContent('No county hovered');
  };

  return (
    <div>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={californiaCounties}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => handleCountyHover(geo.properties.CountyName)}
                onMouseLeave={handleCountyLeave}
                fill="pink"
                stroke="#FFF"
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      <div>The county you are hovering is: {hoverName}</div>
    </div>
  );
};


function test1() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <img src={map} style={ImageStyle} alt="map of cali"/>
            Flynn testing here
          </p>
          
        </header>
        <div ><CaliforniaMap/></div>
      </div>
    );
  }
  
  export default test1;
