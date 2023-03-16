import React from 'react';
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
import './Flynn.css';

const getFavCounty = async ()=>{
  if(!auth.currentUser){
    return;
  }
  var docu= await getDoc(doc(db, "Users", auth.currentUser.uid));
  return docu.data().favCounty;
}
const parsedData=[
  {
    "County": "Alameda County",
    "ZEROBR": 1595,
    "ONEBR": 1934,
    "TWOBR": 2383,
    "THREEBR": 3196,
    "FOURBR": 3863,
    "AVG": 2594.2
  },
  {
    "County": "Alpine County",
    "ZEROBR": 723,
    "ONEBR": 819,
    "TWOBR": 1068,
    "THREEBR": 1528,
    "FOURBR": 1695,
    "AVG": 1166.6
  },
  {
    "County": "Amador County",
    "ZEROBR": 880,
    "ONEBR": 886,
    "TWOBR": 1149,
    "THREEBR": 1644,
    "FOURBR": 1980,
    "AVG": 1307.8
  },
  {
    "County": "Butte County",
    "ZEROBR": 825,
    "ONEBR": 904,
    "TWOBR": 1192,
    "THREEBR": 1692,
    "FOURBR": 2064,
    "AVG": 1335.4
  },
  {
    "County": "Calaveras County",
    "ZEROBR": 718,
    "ONEBR": 837,
    "TWOBR": 1061,
    "THREEBR": 1518,
    "FOURBR": 1837,
    "AVG": 1194.2
  },
  {
    "County": "Colusa County",
    "ZEROBR": 654,
    "ONEBR": 733,
    "TWOBR": 966,
    "THREEBR": 1382,
    "FOURBR": 1673,
    "AVG": 1081.6
  },
  {
    "County": "Contra Costa County",
    "ZEROBR": 1595,
    "ONEBR": 1934,
    "TWOBR": 2383,
    "THREEBR": 3196,
    "FOURBR": 3863,
    "AVG": 2594.2
  },
  {
    "County": "Del Norte County",
    "ZEROBR": 677,
    "ONEBR": 827,
    "TWOBR": 1000,
    "THREEBR": 13887,
    "FOURBR": 1702,
    "AVG": 3618.6
  },
  {
    "County": "El Dorado County",
    "ZEROBR": 1060,
    "ONEBR": 1188,
    "TWOBR": 1495,
    "THREEBR": 2140,
    "FOURBR": 2588,
    "AVG": 1694.2
  },
  {
    "County": "Fresno County",
    "ZEROBR": 795,
    "ONEBR": 851,
    "TWOBR": 1064,
    "THREEBR": 1509,
    "FOURBR": 1747,
    "AVG": 1193.2
  },
  {
    "County": "Glenn County",
    "ZEROBR": 627,
    "ONEBR": 703,
    "TWOBR": 926,
    "THREEBR": 1152,
    "FOURBR": 1256,
    "AVG": 932.8
  },
  {
    "County": "Humboldt County",
    "ZEROBR": 741,
    "ONEBR": 863,
    "TWOBR": 1113,
    "THREEBR": 1593,
    "FOURBR": 1901,
    "AVG": 1242.2
  },
  {
    "County": "Imperial County",
    "ZEROBR": 708,
    "ONEBR": 810,
    "TWOBR": 1060,
    "THREEBR": 1444,
    "FOURBR": 1793,
    "AVG": 1163
  },
  {
    "County": "Inyo County",
    "ZEROBR": 811,
    "ONEBR": 851,
    "TWOBR": 1017,
    "THREEBR": 1374,
    "FOURBR": 1379,
    "AVG": 1086.4
  },
  {
    "County": "Kern County",
    "ZEROBR": 734,
    "ONEBR": 743,
    "TWOBR": 970,
    "THREEBR": 1388,
    "FOURBR": 1679,
    "AVG": 1102.8
  },
  {
    "County": "Kings County",
    "ZEROBR": 894,
    "ONEBR": 903,
    "TWOBR": 1109,
    "THREEBR": 1587,
    "FOURBR": 1708,
    "AVG": 1240.2
  },
  {
    "County": "Lake County",
    "ZEROBR": 707,
    "ONEBR": 813,
    "TWOBR": 1072,
    "THREEBR": 1534,
    "FOURBR": 1603,
    "AVG": 1145.8
  },
  {
    "County": "Lassen County",
    "ZEROBR": 663,
    "ONEBR": 709,
    "TWOBR": 935,
    "THREEBR": 1338,
    "FOURBR": 1439,
    "AVG": 1016.8
  },
  {
    "County": "Los Angeles County",
    "ZEROBR": 1369,
    "ONEBR": 1605,
    "TWOBR": 2058,
    "THREEBR": 2735,
    "FOURBR": 2982,
    "AVG": 2149.8
  },
  {
    "County": "Madera County",
    "ZEROBR": 875,
    "ONEBR": 881,
    "TWOBR": 1151,
    "THREEBR": 1647,
    "FOURBR": 1802,
    "AVG": 1271.2
  },
  {
    "County": "Marin County",
    "ZEROBR": 2350,
    "ONEBR": 2923,
    "TWOBR": 3553,
    "THREEBR": 4567,
    "FOURBR": 4970,
    "AVG": 3672.6
  },
  {
    "County": "Mariposa County",
    "ZEROBR": 746,
    "ONEBR": 836,
    "TWOBR": 1102,
    "THREEBR": 1402,
    "FOURBR": 1908,
    "AVG": 1198.8
  },
  {
    "County": "Mendocino County",
    "ZEROBR": 908,
    "ONEBR": 941,
    "TWOBR": 1240,
    "THREEBR": 1740,
    "FOURBR": 2103,
    "AVG": 1386.4
  },
  {
    "County": "Merced County",
    "ZEROBR": 724,
    "ONEBR": 882,
    "TWOBR": 1067,
    "THREEBR": 1527,
    "FOURBR": 1847,
    "AVG": 1209.4
  },
  {
    "County": "Modoc County",
    "ZEROBR": 546,
    "ONEBR": 612,
    "TWOBR": 807,
    "THREEBR": 1090,
    "FOURBR": 1281,
    "AVG": 867.2
  },
  {
    "County": "Mono County",
    "ZEROBR": 546,
    "ONEBR": 612,
    "TWOBR": 807,
    "THREEBR": 1090,
    "FOURBR": 1281,
    "AVG": 867.2
  },
  {
    "County": "Monterey County",
    "ZEROBR": 1348,
    "ONEBR": 1466,
    "TWOBR": 1793,
    "THREEBR": 2566,
    "FOURBR": 2813,
    "AVG": 1997.2
  },
  {
    "County": "Napa County",
    "ZEROBR": 1331,
    "ONEBR": 1531,
    "TWOBR": 2018,
    "THREEBR": 2826,
    "FOURBR": 2836,
    "AVG": 2108.4
  },
  {
    "County": "Nevada County",
    "ZEROBR": 884,
    "ONEBR": 1013,
    "TWOBR": 1335,
    "THREEBR": 1911,
    "FOURBR": 2052,
    "AVG": 1439
  },
  {
    "County": "Orange County",
    "ZEROBR": 1678,
    "ONEBR": 1888,
    "TWOBR": 2331,
    "THREEBR": 3227,
    "FOURBR": 3716,
    "AVG": 2568
  },
  {
    "County": "Placer County",
    "ZEROBR": 1060,
    "ONEBR": 1118,
    "TWOBR": 1495,
    "THREEBR": 2140,
    "FOURBR": 2588,
    "AVG": 1680.2
  },
  {
    "County": "Plumas County",
    "ZEROBR": 618,
    "ONEBR": 722,
    "TWOBR": 937,
    "THREEBR": 1318,
    "FOURBR": 1569,
    "AVG": 1032.8
  },
  {
    "County": "Riverside County",
    "ZEROBR": 955,
    "ONEBR": 1106,
    "TWOBR": 1390,
    "THREEBR": 1917,
    "FOURBR": 2369,
    "AVG": 1547.4
  },
  {
    "County": "Sacramento County",
    "ZEROBR": 1060,
    "ONEBR": 1188,
    "TWOBR": 1495,
    "THREEBR": 2140,
    "FOURBR": 2588,
    "AVG": 1694.2
  },
  {
    "County": "San Benito County",
    "ZEROBR": 1200,
    "ONEBR": 1270,
    "TWOBR": 1674,
    "THREEBR": 2396,
    "FOURBR": 2898,
    "AVG": 1887.6
  },
  {
    "County": "San Bernardino County",
    "ZEROBR": 955,
    "ONEBR": 1106,
    "TWOBR": 1390,
    "THREEBR": 1917,
    "FOURBR": 2369,
    "AVG": 1547.4
  },
  {
    "County": "San Diego County",
    "ZEROBR": 1478,
    "ONEBR": 1642,
    "TWOBR": 2124,
    "THREEBR": 2987,
    "FOURBR": 3677,
    "AVG": 2381.6
  },
  {
    "County": "San Francisco County",
    "ZEROBR": 2350,
    "ONEBR": 2923,
    "TWOBR": 3553,
    "THREEBR": 4567,
    "FOURBR": 4970,
    "AVG": 3672.6
  },
  {
    "County": "San Joaquin County",
    "ZEROBR": 845,
    "ONEBR": 964,
    "TWOBR": 1270,
    "THREEBR": 1818,
    "FOURBR": 2199,
    "AVG": 1419.2
  },
  {
    "County": "San Luis Obispo County",
    "ZEROBR": 1166,
    "ONEBR": 1263,
    "TWOBR": 1665,
    "THREEBR": 2383,
    "FOURBR": 2877,
    "AVG": 1870.8
  },
  {
    "County": "San Mateo County",
    "ZEROBR": 2350,
    "ONEBR": 2923,
    "TWOBR": 3553,
    "THREEBR": 4567,
    "FOURBR": 4970,
    "AVG": 3672.6
  },
  {
    "County": "Santa Barbara County",
    "ZEROBR": 1728,
    "ONEBR": 2015,
    "TWOBR": 2374,
    "THREEBR": 3137,
    "FOURBR": 3589,
    "AVG": 2568.6
  },
  {
    "County": "Santa Clara County",
    "ZEROBR": 2228,
    "ONEBR": 2558,
    "TWOBR": 3051,
    "THREEBR": 3984,
    "FOURBR": 4593,
    "AVG": 3282.8
  },
  {
    "County": "Santa Cruz County",
    "ZEROBR": 1993,
    "ONEBR": 2292,
    "TWOBR": 3021,
    "THREEBR": 3947,
    "FOURBR": 4419,
    "AVG": 3134.4
  },
  {
    "County": "Shasta County",
    "ZEROBR": 804,
    "ONEBR": 924,
    "TWOBR": 1218,
    "THREEBR": 1743,
    "FOURBR": 2109,
    "AVG": 1359.6
  },
  {
    "County": "Sierra County",
    "ZEROBR": 837,
    "ONEBR": 949,
    "TWOBR": 1237,
    "THREEBR": 1770,
    "FOURBR": 1963,
    "AVG": 1351.2
  },
  {
    "County": "Siskiyou County",
    "ZEROBR": 661,
    "ONEBR": 694,
    "TWOBR": 914,
    "THREEBR": 1308,
    "FOURBR": 1381,
    "AVG": 991.6
  },
  {
    "County": "Solano County",
    "ZEROBR": 1190,
    "ONEBR": 1351,
    "TWOBR": 1617,
    "THREEBR": 2314,
    "FOURBR": 2800,
    "AVG": 1854.4
  },
  {
    "County": "Sonoma County",
    "ZEROBR": 1340,
    "ONEBR": 1519,
    "TWOBR": 1996,
    "THREEBR": 2825,
    "FOURBR": 3254,
    "AVG": 2186.8
  },
  {
    "County": "Stanislaus County",
    "ZEROBR": 890,
    "ONEBR": 987,
    "TWOBR": 1224,
    "THREEBR": 1733,
    "FOURBR": 2033,
    "AVG": 1373.4
  },
  {
    "County": "Sutter County",
    "ZEROBR": 875,
    "ONEBR": 881,
    "TWOBR": 1122,
    "THREEBR": 1606,
    "FOURBR": 1943,
    "AVG": 1285.4
  },
  {
    "County": "Tehama County",
    "ZEROBR": 692,
    "ONEBR": 722,
    "TWOBR": 952,
    "THREEBR": 1261,
    "FOURBR": 1458,
    "AVG": 1017
  },
  {
    "County": "Trinity County",
    "ZEROBR": 587,
    "ONEBR": 680,
    "TWOBR": 868,
    "THREEBR": 1242,
    "FOURBR": 1377,
    "AVG": 950.8
  },
  {
    "County": "Tulare County",
    "ZEROBR": 723,
    "ONEBR": 728,
    "TWOBR": 959,
    "THREEBR": 1337,
    "FOURBR": 1561,
    "AVG": 1061.6
  },
  {
    "County": "Tuolumne County",
    "ZEROBR": 726,
    "ONEBR": 845,
    "TWOBR": 1101,
    "THREEBR": 1551,
    "FOURBR": 1906,
    "AVG": 1225.8
  },
  {
    "County": "Ventura County",
    "ZEROBR": 1269,
    "ONEBR": 1519,
    "TWOBR": 1923,
    "THREEBR": 2690,
    "FOURBR": 3189,
    "AVG": 2118
  },
  {
    "County": "Yolo County",
    "ZEROBR": 1085,
    "ONEBR": 1147,
    "TWOBR": 1511,
    "THREEBR": 2162,
    "FOURBR": 2584,
    "AVG": 1697.8
  },
  {
    "County": "Yuba County",
    "ZEROBR": 876,
    "ONEBR": 881,
    "TWOBR": 1122,
    "THREEBR": 1606,
    "FOURBR": 1943,
    "AVG": 1285.6
  }
 ];
const CaliforniaMap = (lastFave='') => {

  const [hoverName, setTooltipContent] = React.useState('');
  const [clickedName, setClickedName] = React.useState('No county selected yet');
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
    setTooltipContent('');
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
    if(clicked==='No county selected yet'){
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
      setCurrFave(lastFave.lastFave);
      setFavPrice(parsedData.find(county => county.County === (lastFave.lastFave+" County")));
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="flynn-page">
        You are looking at: {hoverName} <br></br>
        Last Selected: {clickedName}
        <br></br>
        <div className='text-display'>
        The rent data for {clickedName} County is as follows: <br></br>
        Average Rent Cost : ${rentPrice.AVG} USD <br></br>
        Zero Bedrooms: ${rentPrice.ZEROBR} USD <br></br>
        One Bedroom: ${rentPrice.ONEBR} USD <br></br>
        Two Bedrooms: ${rentPrice.TWOBR} USD <br></br>
        Three Bedrooms: ${rentPrice.THREEBR} USD <br></br>
        Four Bedrooms: ${rentPrice.FOURBR} USD <br></br>
        </div>

        Current Favorite: {currFave}
        <div className='text-display'>
        The rent data for your favorite, {currFave} County, is as follows: <br></br>
        Average Rent Cost : ${favPrice.AVG} USD <br></br>
        Zero Bedrooms: ${favPrice.ZEROBR} USD <br></br>
        One Bedroom: ${favPrice.ONEBR} USD <br></br>
        Two Bedrooms: ${favPrice.TWOBR} USD <br></br>
        Three Bedrooms: ${favPrice.THREEBR} USD <br></br>
        Four Bedrooms: ${favPrice.FOURBR} USD <br></br>
        <button className='favCounty-button' onClick={() => handleFavcounty(clickedName)}>Set Favorite County</button><br></br>
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
  props.onPageSwitch('map');
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
        <button className='logout-button' onClick={() => props.onPageSwitch('pie')}>Pie Chart</button>
        <button className="logout-button" onClick={() => logOut(props)}>Log out</button>
        <div ><CaliforniaMap lastFave={favCounty2}/></div>
      </div>
    );
}
  
export default Test1;
