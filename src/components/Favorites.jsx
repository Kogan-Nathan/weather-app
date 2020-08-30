import React from 'react'
import {Link} from 'react-router-dom'

export default function Favorites(props) {

    function DateString(date){
        const day = new Date(date)
        return <p>{day.toDateString()}</p>
    } //changes the ISO date value from the API to readable Date with "toDateString" function
    
    function sendInfo(CityInfo){
        props.SendCity(CityInfo)
    } //simply sends all the information about a city to the function "openFavoriteCity" at App page

    function toggleTemperature(value){
        if(props.TempUnit){
            return value + "C"
        }
        else{
            return (value*1.8+32) + "F"
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

    function checkFavorites(){
        if(props.favoriteCities===undefined){
            return <h2 className="Empty-Title">No Favorites Yet</h2>
        }
        else{
            if(props.favoriteCities.length>0){
                return <div className="Favorite-Page"> 
                {props.favoriteCities.map((City,Index)=>{
                    return <Link to="/" onClick={()=>{sendInfo(City)}} key={"linkTo"+Index}><div className="Daily" key={"day"+Index}>
                        <p className="Center Bigger">{City.selectedCity.LocalizedName}</p>
                        {DateString(City.cityData[0].LocalObservationDateTime)} {/* a continous function that returns different days */}
                        <p>{toggleTemperature(City.cityData[0].Temperature.Metric.Value)+toggleTemperatureUnit()}</p>
                    </div></Link>
                })}
            </div>
            }
            else{
                return <h2 className="Empty-Title">No Favorites Yet</h2>
            }
        }
    }
    return (
        <div>
            {checkFavorites()} {/* a continous function that returns different results */}
        </div>
    )
}
