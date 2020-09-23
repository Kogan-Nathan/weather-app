import React,{useState} from 'react';
import {HashRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import MenuNav from './components/MenuNav';
import Home from './components/Home'
import Favorites from './components/Favorites';
const ApiKey = "c1Ovp4IqKAag4Md99AAiQJlwAdHhNxmC"

function App() {
  const [firstRender, setFirstRender] = useState(true)
  const [fetchResult, setFetchResult] = useState("")
  const [cityData,setCityData]=useState("")
  const [cityForecastData,setCityForecastData]=useState("")
  const [isCelsuis,setIsCelsuis]=useState(true)
  const [selectedCity,setSelectedCity]=useState({
    Key: "215854",Type: "City",LocalizedName: "Tel Aviv",
    Country: {ID: "IL", LocalizedName: "Israel"},AdministrativeArea: {ID: "TA", LocalizedName: "Tel Aviv"}
  })
  const [favorites,setFavorites]=useState([])
  
  function handleFirstRender() {
    if (firstRender === true) {
      getDefault()
      setFirstRender(false)                
    }
  }

  function handleBackgroundColor(TemperatureValue){
    if(TemperatureValue<=0){
      document.documentElement.style.setProperty("--back_x", "#acb6e5");
      document.documentElement.style.setProperty("--back_y", "#86fde8");
    }
    else if(TemperatureValue>=0.1&&TemperatureValue<=19.9){
      document.documentElement.style.setProperty("--back_x", "#83a4d4");
      document.documentElement.style.setProperty("--back_y", "#b6fbff");
    }
    else if(TemperatureValue>=20&&TemperatureValue<=27.9){
      document.documentElement.style.setProperty("--back_x", "#ed4264");
      document.documentElement.style.setProperty("--back_y", "#ffedbc");
    }
    else if(TemperatureValue>=28&&TemperatureValue<=34.9){
      document.documentElement.style.setProperty("--back_x", "#ff9966");
      document.documentElement.style.setProperty("--back_y", "#ff5e62");
    }
    else if(TemperatureValue>=35){
      document.documentElement.style.setProperty("--back_x", "#f12711");
      document.documentElement.style.setProperty("--back_y", "#f5af19");
    }
  }

  async function getSpecific(cityInfo,cityKey){
    setFetchResult("")
    setSelectedCity(cityInfo)

    const CityDataApi = await
      fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${ApiKey}`)
    const CityCurrentData = await CityDataApi.json();
    
    const CityForecastApi = await
      fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${ApiKey}&language=en-us&details=true&metric=true`)
    const CityForecast = await CityForecastApi.json();

    if(CityDataApi.status===200&&CityForecastApi.status===200){
      setCityData(CityCurrentData)
      setCityForecastData(CityForecast)
      handleBackgroundColor(CityCurrentData[0].Temperature.Metric.Value)
      setFetchResult(CityForecastApi)
    }
    else{
      setFetchResult(CityForecastApi)
      console.error(CityForecast.Message)
    }
  }

  async function getDefault(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position)=>{
        const CityGeolocationApi = await 
          fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${ApiKey}&q=${position.coords.latitude}%2C${position.coords.longitude}`)
        const CityGeolocationAddress = await CityGeolocationApi.json();         
        if(CityGeolocationApi.status===200){
          getSpecific(CityGeolocationAddress, CityGeolocationAddress.Key)
        }
        else{
          setFetchResult(CityGeolocationApi)
          console.error(CityGeolocationAddress.Message)
        }
      }, showDefault);
    }
    else{
      getSpecific(selectedCity, selectedCity.Key)
    }

    function showDefault(){
      getSpecific(selectedCity, selectedCity.Key)
    }
  }

  function UpdateFavoriteCities(CityAddressKey){
    let index = favorites.findIndex(object => object.selectedCity.Key === CityAddressKey)
    if(index>=0){
      let temp = favorites.filter((value,i)=>(i!==index))
        setFavorites(temp)
      }
    else{
      setFavorites([{selectedCity,cityData},...favorites])
    }
  }
  
  function openFavoriteCity(FavoriteCity){
    getSpecific(FavoriteCity.selectedCity, FavoriteCity.selectedCity.Key)
  }

  function handleTempValue(){
    setIsCelsuis(!isCelsuis)
  }

  return (
    <div className="App" onLoad={handleFirstRender()}>
    <Router>
    <MenuNav UpdateTempValue={handleTempValue}/>
    <Switch>
      <Route exact path="/" component={()=>{return <Home
      City={selectedCity}
      CityCurrentData={cityData}
      City5DayCast={cityForecastData}
      UpdateResult={getSpecific}
      favoriteCities={favorites}
      UpdateFavorites={UpdateFavoriteCities}
      TempUnit={isCelsuis}
      fetch={fetchResult}
      />}}/>
      <Route exact path="/favorites" component={()=>{return <Favorites SendCity={openFavoriteCity} cities={favorites} TempUnit={isCelsuis}/>}}/>
    </Switch>
    </Router>
    </div>
  );
}

export default App;