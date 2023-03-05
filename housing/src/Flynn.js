import map from './images/CAMap.png';
const ImageStyle={
  width:`500px`,
  float:'right'
}
function test1() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <img src={map} style={ImageStyle} alt="map of cali"/>
            Flynn testing here
          </p>
        </header>
      </div>
    );
  }
  
  export default test1;