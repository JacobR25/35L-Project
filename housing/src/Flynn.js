import React from 'react';
import './App.css';
import Papa from 'papaparse';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import californiaCounties from './California_County_Boundaries.geojson';
import data from './counties - Sheet1.csv';
import { getAuth, signOut } from "firebase/auth";
import{doc, updateDoc, getDoc} from 'firebase/firestore';
import {db,auth} from "./firebase.js";
const getFavCounty = async ()=>{
  if(!auth.currentUser){
    return;
  }
  var docu= await getDoc(doc(db, "Users", auth.currentUser.uid));
  return docu.data().favCounty;
}
const CaliforniaMap = (lastFave='') => {

  const [parsedData, setData] = React.useState([]);
  React.useEffect(() => {
    Papa.parse(data, {
      download: true,
      header: true,
      complete: function(results) {
        setData(results.data);
      }
    });
  }, []);
  //const [fav, setFav]= React.useState('');
  const [hoverName, setTooltipContent] = React.useState('No county hovered');
  const [clickedName, setClickedName] = React.useState('No county clicked yet');
  const [currFave, setCurrFave]= React.useState('');
  const [rentPrice, setRentPrice]= React.useState([]);
  const [favPrice, setFavPrice]= React.useState([]);
  const [divStyle, setDivStyle]= React.useState('none');
  const [favStyle, setFaveStyle]=React.useState('none');
  const handleCountyHover = (CountyName) => {
    setTooltipContent(CountyName);
  };
  const handleMouseDown = async (CountyName) => {
    //call function to display the county rent info
    setRentPrice(parsedData.find(county => county.County === (CountyName+" County")));
    setDivStyle('inline');
    setClickedName(CountyName);
  };
  const handleCountyLeave = () => {
    setTooltipContent('No county hovered');
  };
  const isHovered = (name) => {
    // fav =await getDoc(doc(db, "Users", auth.currentUser.uid)).data().favCounty;

    // if(name===fav){
    //   return 'green';
    // }
    if(currFave===''){
      if(lastFave.lastFave===name){
        return 'green';
      }
    }else if(name===currFave){
      return 'green';
    }
    if(name===currFave){
      return 'green';
    }
    if(name===clickedName){
      return 'blue';
    }
    if(name===hoverName){
      return 'red';
    }
    return 'pink';
  }
  async function handleFavcounty(clicked) {
    if(clicked==='No county clicked yet'){
      window.alert("Select a county to set a favorite");
      return;
    }
    setCurrFave(clicked);
    setFavPrice(parsedData.find(county => county.County === (clicked+" County")));
    if(!auth.currentUser){
      return;
    }
    await updateDoc(doc(db, "Users", auth.currentUser.uid),{
      favCounty: clicked
      });
  }
  if(favStyle==='none' && (lastFave.lastFave!==''||currFave!=='')){
    setFaveStyle('inline');
    if(currFave!==''){
      
      setFavPrice(parsedData.find(county => county.County === (currFave+" County")));
    }else {
      console.log(lastFave.lastFave);
      setCurrFave(lastFave.lastFave);
      setFavPrice(parsedData.find(county => county.County === (lastFave.lastFave+" County")));
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ marginLeft:"60px", width:'30%' }}>
        The county you are hovering is: {hoverName} <br></br>
        You just clicked: {clickedName}
        <br></br>
        <div style={{display: divStyle}}>
        The rent data for {clickedName} County is as follows: <br></br>
        Average Rent Cost : ${rentPrice.AVG} USD <br></br>
        Zero Bedrooms: ${rentPrice.ZEROBR} USD <br></br>
        One Bedroom: ${rentPrice.ONEBR} USD <br></br>
        Two Bedrooms: ${rentPrice.TWOBR} USD <br></br>
        Three Bedrooms: ${rentPrice.THREEBR} USD <br></br>
        Four Bedrooms: ${rentPrice.FOURBR} USD <br></br>
        </div>
        <button style={{
        border: "none",
        backgroundColor: "transparent",
        color: "#0077FF",
        textDecoration: "underline",
        cursor: "pointer",
        display: "inline-block",
        padding: "0",
        margin: "0",
        lineHeight: "1.1",}} onClick={() => handleFavcounty(clickedName)}>Set Favorite County</button><br></br>
        <div style={{display: favStyle}}>
        The rent data for your favorite, {currFave} County, is as follows: <br></br>
        Average Rent Cost : ${favPrice.AVG} USD <br></br>
        Zero Bedrooms: ${favPrice.ZEROBR} USD <br></br>
        One Bedroom: ${favPrice.ONEBR} USD <br></br>
        Two Bedrooms: ${favPrice.TWOBR} USD <br></br>
        Three Bedrooms: ${favPrice.THREEBR} USD <br></br>
        Four Bedrooms: ${favPrice.FOURBR} USD <br></br>
        </div>
      </div>

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
            style={{ transform: "translate(700px, 10px)" }}
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
                  style={{
                    default: {
                        outline: 'none'
                    },
                    hover: {
                        outline: 'none'
                    },
                    pressed: {
                        outline: 'none'
                    }
                }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      
      
    </div>
  );
};

function logOut(props){
const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  props.onStateSwitch('locked');
  
}).catch((error) => {
  window.alert("something went wrong");
});
  
}

function Test1(props) {
  const [favCounty2, setFavCounty] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const fav = await getFavCounty();
      if(!fav){
        return;
      }
      setFavCounty(fav);
    };
    fetchData();
  }, []);

    return (
      <div>
        <a className="logout-button" href="./pieChart.html">link to piechart section</a>
        <button className="logout-button" onClick={() => logOut(props)}>Log out</button>
        <div ><CaliforniaMap lastFave={favCounty2}/></div>
      </div>
    );
}
  
export default Test1;
