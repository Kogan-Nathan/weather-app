import React,{useState} from 'react'
import dayIcon from '../icons/animated/day.svg'
import nightIcon from '../icons/animated/night.svg'
import cloudyDay1Icon from '../icons/animated/cloudy-day-1.svg'
import cloudyDay2Icon from '../icons/animated/cloudy-day-2.svg'
import cloudyDay3Icon from '../icons/animated/cloudy-day-3.svg'
import cloudyNight1Icon from '../icons/animated/cloudy-night-1.svg'
import cloudyNight2Icon from '../icons/animated/cloudy-night-2.svg'
import cloudyNight3Icon from '../icons/animated/cloudy-night-3.svg'
import cloudyIcon from '../icons/animated/cloudy.svg'
import rainy1Icon from '../icons/animated/rainy-1.svg'
import rainy2Icon from '../icons/animated/rainy-2.svg'
import rainy4Icon from '../icons/animated/rainy-4.svg'
import rainy6Icon from '../icons/animated/rainy-6.svg'
import rainy7Icon from '../icons/animated/rainy-7.svg'
import thunderIcon from '../icons/animated/thunder.svg'
import snowy1Icon from '../icons/animated/snowy-1.svg'
import snowy2Icon from '../icons/animated/snowy-2.svg'
import snowy3Icon from '../icons/animated/snowy-3.svg'
import snowy4Icon from '../icons/animated/snowy-4.svg'
import snowy5Icon from '../icons/animated/snowy-5.svg'
import snowy6Icon from '../icons/animated/snowy-6.svg'
const ApiKey="CGRS4K6iE0lcn3Xy8nsinEK0AxUqE6hd"

export default function Home(props) {
    const [tempValue,setTempValue]=useState('')
    const [tempCities,setTempCities]=useState({})
    const [tempSelectedCity,setTempSelectedCity]=useState()
    const [tempCityKey,setTempCityKey]=useState()

    async function getCity(e){
        const cityName = e.target.value;
        if(cityName<"A"||cityName>"z"){
            setTempValue('') 
            setTempCities({})            
        }
        else{
            const ApiCallAutoComplete = await 
            fetch (`https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ApiKey}&q=${cityName}&language=en-us`)
            const autoComplete = await ApiCallAutoComplete.json();
            // get information from API with fetch
            // translating the information to readable JS

            setTempValue(cityName) //updatwa input state
            setTempCities(autoComplete) //updates search suggestions state
        }
    } //this function checks the input to be only in english
    // if it does, it gets the information from the server about our input 
    // and finally it updates the states responsabile for the search and the search input

    function DateString(date){
        const day = new Date(date)
        return <p className="Center Bigger">{day.toDateString()}</p>
    } // the -date- value we sent hold a wide information, we dont need like timezone... 
    // the "new Date()" method displays it more comfortably, but still not quite what we need
    // with "toDateString" method we finaly convert the value to something more practical

    function TimeString(date){
        const time = new Date(date)
        return <p className="Center Bigger">{time.getHours()+":00"}</p>
    } // the -date- value we sent hold a wide information, we dont need like timezone... 
    // the "new Date()" method displays it more comfortably, but still not quite what we need
    // with "toDateString" method we finaly convert the value to something more practical

    function getIcon(IconValue){
        if(IconValue===1||IconValue===2){
            return <img src={dayIcon} alt="sun Icon"/>
        }
        else if(IconValue===3){
            return <img src={cloudyDay1Icon} alt="cloudy Icon"/>
        }
        else if(IconValue===4){
            return <img src={cloudyDay2Icon} alt="cloudy Icon"/>
        }
        else if(IconValue===5||IconValue===6){
            return <img src={cloudyDay3Icon} alt="cloudy Icon"/>
        }
        else if(IconValue===7||IconValue===8||IconValue===11||IconValue===30||IconValue===31||IconValue===32){
            return <img src={cloudyIcon} alt="cloudy Icon"/>
        }
        else if(IconValue===12||IconValue===39||IconValue===40){
            return <img src={rainy4Icon} alt="rainy Icon"/>
        }
        else if(IconValue===13){
            return <img src={rainy2Icon} alt="rainy Icon"/>
        }
        else if(IconValue===14){
            return <img src={rainy1Icon} alt="rainy Icon"/>
        }
        else if(IconValue===15||IconValue===16||IconValue===17||IconValue===41||IconValue===42){
            return <img src={thunderIcon} alt="thunder Icon"/>
        }
        else if(IconValue===18||IconValue===25){
            return <img src={rainy6Icon} alt="rainy Icon"/>
        }
        else if(IconValue===19||IconValue===43){
            return <img src={snowy4Icon} alt="snowy Icon"/>
        }
        else if(IconValue===20){
            return <img src={snowy2Icon} alt="snowy Icon"/>
        }
        else if(IconValue===21){
            return <img src={snowy1Icon} alt="snowy Icon"/>
        }
        else if(IconValue===22){
            return <img src={snowy6Icon} alt="snowy Icon"/>
        }
        else if(IconValue===23){
            return <img src={snowy3Icon} alt="snowy Icon"/>
        }
        else if(IconValue===24||IconValue===44){
            return <img src={snowy5Icon} alt="snowy Icon"/>
        }
        else if(IconValue===25||IconValue===29){
            return <img src={rainy7Icon} alt="rainy Icon"/>
        }
        else if(IconValue===33||IconValue===34){
            return <img src={nightIcon} alt="moon Icon"/>
        }
        else if(IconValue===35){
            return <img src={cloudyNight1Icon} alt="cloudy Icon"/>
        }
        else if(IconValue===36){
            return <img src={cloudyNight2Icon} alt="cloudy Icon"/>
        }
        else if(IconValue===37||IconValue===38){
            return <img src={cloudyNight3Icon} alt="cloudy Icon"/>
        }
    }

    function submitSearch(data){
        setTempCityKey(data.Key); //updates city address
        setTempCities({}); //removes the suggestions
        setTempValue(data.LocalizedName+", "+data.Country.LocalizedName); //manipulates the input to show the user the city he clicked
        setTempSelectedCity(data); // updaes city information
    } //this function updates the states after the user chose a City from the autocomplete

    function submitCity(e){
        if(tempValue===''){
            alert('No Input')
            e.preventDefault() //prevents default actions, i wanted to avoid page reload
        }
        else{
            if(tempCityKey===undefined){
                alert("Please select a City")
                e.preventDefault() //prevents default actions, i wanted to avoid page reload
            }
            else{
                props.UpdateResult(tempSelectedCity,tempCityKey);
            }
        }
    } // function responsable for sending the information that chosen to App page, to update Home (only when there is a value selected from suggestions)

    function toggleFavorite(){
        props.UpdateFavorites(props.CityAddress)
    } //send a City address to App page to toggle Favorite

    function toggleTemperature(value){
        if(props.TempUnit){
            return value
        }
        else{
            return (parseInt(value)*1.8+32)
        }
    } //converts Celsius to Fahrenheit and vice versa

    function toggleTemperatureUnit(){
        if(props.TempUnit){
            return "C"
        }
        else{
            return "F"
        }
    } //converts Celsius to Fahrenheit and vice versa

    function checkFavorite(){
        let index = props.favoriteCities.findIndex(object => object.selectedCity.Key === props.CityAddress)
        if(index>=0){
            return <button onClick={toggleFavorite} className="Favorite-Button">Remove from Favorites</button>
        }
        else{
            return <button onClick={toggleFavorite} className="Favorite-Button">Add to Favorites</button>
        }
    }   // function that returns a button depending on the favorites

    function show(){
        if(props.City===undefined||props.CityCurrentData===undefined||props.City5DayCast===undefined){
            return <h2 className="Empty-Title">Loading, please wait...</h2>
        }
        else{
            try {
                return <div className="Home-Result">
                <div className="Top">
                    <div className="Favorite-Title">
                        <h2>{props.City.LocalizedName}</h2>
                        <p>{props.City.Country.LocalizedName}</p>
                        <p>{toggleTemperature(props.CityCurrentData[0].Temperature.Metric.Value)+toggleTemperatureUnit()}</p>
                    </div>
                    <div className="Favorite-Toggle">
                        {checkFavorite()} {/* a continious function that returns a toggle Favorite button*/}
                    </div>
                </div>
                <div className="Center">
                    <h1>Today's forecast - {props.CityCurrentData[0].WeatherText}</h1>
                </div>
                <div className="Hourly-ForeCast">
                    {props.CityHourlyCast.filter((object,index)=> index % 3 === 0).map((hour,index)=>{
                        return <div className="Hourly" key={"hour"+index}>
                            {TimeString(hour.DateTime)} {/* a continious function that converts to date string */}
                            <div className="Forecast-Content">
                                <span>{Math.floor(toggleTemperature(hour.Temperature.Value))+toggleTemperatureUnit()}</span>{getIcon(hour.WeatherIcon)}
                            </div>
                        </div>
                    })} {/* assuming the 24hour forecast starts from now and we are including now at the map */}
                    
                </div>
                <div className="Bottom">
                    <h3 className="Bottom-Title">The Next days</h3>
                    <div className="Bottom-Days">
                        {props.City5DayCast.DailyForecasts.map((day,index)=>{
                            return <div className="Daily" key={"day"+index}>
                                {DateString(day.Date)} {/* a continious function that returns different days */}
                                <div className="Forecast-Content">
                                    <p>{Math.floor(toggleTemperature(day.Temperature.Minimum.Value))+toggleTemperatureUnit()} - {Math.floor(toggleTemperature(day.Temperature.Maximum.Value))+toggleTemperatureUnit()}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>                
            } 
            catch{
                return <h2 className="Empty-Title">Something is wrong...</h2>
            }
        }
    } // this function checks if there is Data to show, once there is it displays the weather

    function showCities(){
        if(tempCities.length>0){
            return <div className="Autocomplete-Box">
                {tempCities.map((data,index)=>{
                    return <button onClick={()=>{submitSearch(data)}}
                        className="Autocomplete-Options" 
                        key={"city"+index}>
                        <h3>{data.LocalizedName}</h3>
                        <h4>, {data.Country.LocalizedName}</h4>
                        <h5>, {data.AdministrativeArea.LocalizedName}</h5>
                    </button>
                })}
            </div>
        }
    } // function that returns the search suggestions only if there's data in the state-"tempCities"

    return (
        <div className="Home-Page">
            <form className="Home-Search">
                <input onChange={getCity} value={tempValue} type="text" autoComplete="off" placeholder="Search for a City"/>
                <button onClick={(e)=>{submitCity(e)}} className="Search-Button">Submit</button>
                {showCities()} {/* a continious function that returns search options */}
            </form>
            {show()} {/* a continious function that returns different results */}
        </div>  
    )
}

// props.CityHourlyCast.filter((object,index)=> index % 3 === 2).map((hour,index)=>{
//     return <div className="Hourly" key={"hour"+index}>
//         {TimeString(hour.DateTime)} {/* a continious function that converts to date string */}
//         <div className="Forecast-Content">
//             <p>{Math.floor(hour.Temperature.Value)+hour.Temperature.Unit}</p>
//         </div>
//     </div>
// })