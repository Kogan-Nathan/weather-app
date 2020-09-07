import React,{useState} from 'react';
import {HashRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import MenuNav from './components/MenuNav';
import Home from './components/Home'
import Favorites from './components/Favorites';
const ApiKey="CGRS4K6iE0lcn3Xy8nsinEK0AxUqE6hd"

function App() {
  const [firstRender, setFirstRender] = useState(true)
  const [specCityAddress,setSpecCityAddress]=useState('215854')
  const [cityData,setCityData]=useState()
  const [cityHourlyForecastData,setCityHourlyForecastData]=useState()
  const [cityForecastData,setCityForecastData]=useState()
  const [isCelsuis,setIsCelsuis]=useState(true)
  // const [geolocationLongitude,setGeolocationLongtitude]=useState()
  // const [geolocationLatitude,setGeolocationLatitude]=useState()
  const [selectedCity,setSelectedCity]=useState({
    Key: "215854",Type: "City",LocalizedName: "Tel Aviv",
    Country: {ID: "IL", LocalizedName: "Israel"},AdministrativeArea: {ID: "TA", LocalizedName: "Tel Aviv"}
  })
  const [favorites,setFavorites]=useState([])
  
  function checkFirstRender() {
    if (firstRender === true) {
      defaultResult()
      setFirstRender(false)                
    }
  } //on first render activates function "defaultResult"

  async function showResult(cityInfo,cityKey){
    setSpecCityAddress(cityKey); //update city address
    setSelectedCity(cityInfo); // update city location data
    
    const CityDataApi = await
      fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${ApiKey}`)
    const CityData = await CityDataApi.json();
    // get information from API with fetch
    // translating the information to readable JS
    
    const CityHourlyForecastApi = await
    fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityKey}?apikey=${ApiKey}&details=true&metric=true`)
    const CityHourlyForecast = await CityHourlyForecastApi.json();
    // get information from API with fetch
    // translating the information to readable JS

    const CityForecastApi = await
      fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${ApiKey}&language=en-us&details=true&metric=true`)
    const CityForecast = await CityForecastApi.json();
    // get information from API with fetch
    // translating the information to readable JS

    setCityData(CityData) // update current weather
    setCityHourlyForecastData(CityHourlyForecast) // update Hourly forcast
    setCityForecastData(CityForecast) // update forcast
  } //this function "showResult" sets states for the chosen city by the user through the search input by the submit button

  async function defaultResult(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position)=>{
        //  insert geolocation api method with new values from navigator
        const CityGeolocationApi = await 
          fetch (`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${ApiKey}&q=${position.coords.latitude}%2C${position.coords.longitude}`)
        const CityGeolocationAddress = await CityGeolocationApi.json();
        showResult(CityGeolocationAddress, CityGeolocationAddress.Key)
      });
    }
    else{
    const CityDataApi = await 
      fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/${specCityAddress}?apikey=${ApiKey}`)
    const CityData = await CityDataApi.json();
    // get information from API with fetch
    // translating the information to readable JS

    const CityHourlyForecastApi = await
      fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${specCityAddress}?apikey=${ApiKey}&details=true&metric=true`)
    const CityHourlyForecast = await CityHourlyForecastApi.json();
    // get information from API with fetch
    // translating the information to readable JS

    const CityForecastApi = await 
      fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/${specCityAddress}?apikey=${ApiKey}&language=en-us&details=true&metric=true`)
    const CityForecast = await CityForecastApi.json();
    // get information from API with fetch
    // translating the information to readable JS

    setCityData(CityData) // update current weather
    setCityHourlyForecastData(CityHourlyForecast) // update Hourly forcast
    setCityForecastData(CityForecast) // update forcast
    }
  } //this function "defaultResult" sets states for Tel-Aviv (the default choice)

  function UpdateFavoriteCities(CityAddressKey){
    let index = favorites.findIndex(object => object.selectedCity.Key === CityAddressKey)
    if(index>=0){
      let temp = favorites.filter((value,i)=>(i!==index))
        setFavorites(temp)
      }
    else{
      setFavorites([{selectedCity,cityData},...favorites])
    }
  } //this function "UpdateFavoriteCities" gets a -cityAdress- and checks if it exists in the favorites state
  //  if it does exists, it simply removes it, but if its does not exists, it adds the city
  function openFavoriteCity(FavoriteCity){
    showResult(FavoriteCity.selectedCity, FavoriteCity.selectedCity.Key)
  } // sends the information to "showResult" so we will update all the databases(from the API) with a new information

  function updateSelectedCity(cityInformation){
    setSelectedCity(cityInformation)
  } //simply updates state that holds information about city name and country with new one

  function UpdateCurrent(CityCurrent){
    setCityData(CityCurrent)
  } //simply updates state that holds information about city current weather with new one

  function UpdateCityforecast(CityForecastInfo){
    setCityForecastData(CityForecastInfo)
  } //simply updates state that holds information about city forecast with new one

  function UpdateCityAddress(address){
    setSpecCityAddress(address)
  } //simply updates state that holds information about city address with new one

  function toggleTempValue(){
    setIsCelsuis(!isCelsuis)
  }

  return (
    <div className="App" onLoad={checkFirstRender()}>
    <Router>
    <MenuNav TempUnit={toggleTempValue}/>
    <Switch>
      <Route exact path="/" component={()=>{return <Home
      City={selectedCity}
      UpdateSelectedCity={updateSelectedCity}
      CityCurrentData={cityData}
      UpdateCurrentData={UpdateCurrent}
      CityHourlyCast={cityHourlyForecastData}
      City5DayCast={cityForecastData}
      UpdateCityCast={UpdateCityforecast}
      CityAddress={specCityAddress}
      UpdateAddress={UpdateCityAddress}
      UpdateResult={showResult}
      favoriteCities={favorites}
      UpdateFavorites={UpdateFavoriteCities}
      TempUnit={isCelsuis}
      />}}/>
      <Route exact path="/favorites" component={()=>{return <Favorites SendCity={openFavoriteCity} favoriteCities={favorites} TempUnit={isCelsuis}/>}}/>
    </Switch>
    </Router>
    </div>
  );
}

export default App;
