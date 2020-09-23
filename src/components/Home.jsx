import React,{useState} from 'react'
import DayComp from './DayComp'
const ApiKey = "c1Ovp4IqKAag4Md99AAiQJlwAdHhNxmC"

export default function Home(props) {
    const [inputValue,setInputValue]=useState('')
    const [tempCities,setTempCities]=useState("")
    const [tempSelectedCity,setTempSelectedCity]=useState()
    const [tempCityKey,setTempCityKey]=useState()

    async function getCitiesFromAPI(e){
        const searchValue = e.target.value;
        if(searchValue<"A"||searchValue>"z"){
            setInputValue('') 
            setTempCities("")            
        }
        else{
            setInputValue(searchValue)
            const AutoCompleteAPI = await 
            fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ApiKey}&q=${searchValue}&language=en-us`)
            const autoComplete = await AutoCompleteAPI.json();

            if(AutoCompleteAPI.status===200){
                setTempCities(autoComplete)
            }
            else{
                setTempCities(autoComplete.Message) 
                console.error(autoComplete.Message)
            }
        }
    }

    function handleBackgroundColor(TemperatureValue){
        if(TemperatureValue===undefined){
            document.documentElement.style.setProperty("--back_x", "#b8b7b8");
            document.documentElement.style.setProperty("--back_y", "#eef2f3");
        }
        else if(TemperatureValue<=0){
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

    function handleAutocComplete(data){
        setTempCityKey(data.Key)
        setTempCities({})
        setInputValue(data.LocalizedName+", "+data.Country.LocalizedName)
        setTempSelectedCity(data)
    }

    function submitCity(e){
        if(inputValue===''){
            alert('No Input')
            e.preventDefault()
        }
        else{
            if(tempCityKey===undefined){
                alert("Please select a City")
                e.preventDefault()
            }
            else{
                props.UpdateResult(tempSelectedCity,tempCityKey);
            }
        }
    }

    function toggleFavorite(){
        props.UpdateFavorites(props.City.Key)
    }

    function toggleTemperature(value){
        if(props.TempUnit){
            return value
        }
        else{
            return (parseInt(value)*1.8+32)
        }
    }

    function toggleTemperatureUnit(){
        if(props.TempUnit){
            return "C"
        }
        else{
            return "F"
        }
    }

    function checkFavorite(){
        let index = props.favoriteCities.findIndex(object => object.selectedCity.Key === props.City.Key)
        if(index>=0){
            return <button onClick={toggleFavorite} className="Favorite-Button">Remove from Favorites</button>
        }
        else{
            return <button onClick={toggleFavorite} className="Favorite-Button">Add to Favorites</button>
        }
    }

    function show(){
        if(props.fetch===""){
            handleBackgroundColor(undefined)
            return <h2 className="Empty-Title">Loading, please wait...</h2>
        }
        else if(props.fetch.status!==200){
            handleBackgroundColor(undefined)
            return <h2 className="Empty-Title">{props.fetch.statusText}, Please come back later</h2>
        }
        else if(props.fetch.status===200){
            handleBackgroundColor(props.CityCurrentData[0].Temperature.Metric.Value)
            return <div className="Home-Result">
            <div className="Top">
                <div className="Favorite-Title">
                    <h1>{props.City.LocalizedName}</h1>
                    <h2>{props.City.Country.LocalizedName}</h2>
                    <p>At the moment: {toggleTemperature(props.CityCurrentData[0].Temperature.Metric.Value)+toggleTemperatureUnit()}</p>
                </div>
                <div className="Favorite-Toggle">
                    {checkFavorite()}
                </div>
            </div>
            <div className="Center">
                <h1>Today's forecast - {props.CityCurrentData[0].WeatherText}</h1>
            </div>
            <div className="Bottom">
                <h3 className="Bottom-Title">The Next days</h3>
                <div className="Bottom-Days">
                    {props.City5DayCast.DailyForecasts.map( day =>{
                        return <DayComp key={day.Date} self={day} TempUnit={props.TempUnit}/>
                    })}
                </div>
            </div>
        </div>
        }
    }

    function showAutoComplete(){
        if(tempCities.length>0){
            if((typeof tempCities)==="object"){
                return <div className="Autocomplete-Box">
                {tempCities.map((data,index)=>{
                    return <button onClick={()=>{handleAutocComplete(data)}}
                        className="Autocomplete-Options" 
                        key={"city"+index}>
                        <h3>{data.LocalizedName}</h3>
                        <h4>, {data.Country.LocalizedName}</h4>
                        <h5>, {data.AdministrativeArea.LocalizedName}</h5>
                    </button>
                })}
            </div>
            }
            else{
                return <div className="Autocomplete-Box">
                    {tempCities}
                </div>
            }
        }
    }

    return (
        <div className="Home-Page">
            <div className="Home-Search">
                <input onChange={getCitiesFromAPI} value={inputValue} type="text" autoComplete="off" placeholder="Search for a City"/>
                <button onClick={(e)=>{submitCity(e)}} className="Search-Button">Submit</button>
                {showAutoComplete()}
            </div>
            {show()}
        </div>  
    )
}