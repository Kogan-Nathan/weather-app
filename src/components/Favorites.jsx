import React from 'react'
import {Link} from 'react-router-dom'

export default function Favorites(props) {

    function DateString(date){
        const day = new Date(date)
        return <p>{day.toDateString()}</p>
    }
    
    function sendInfo(CityInfo){
        props.SendCity(CityInfo)
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

    function checkFavorites(){
        document.documentElement.style.setProperty("--back_x", "#b8b7b8");
        document.documentElement.style.setProperty("--back_y", "#eef2f3");
        if(props.cities.length===0){
            return <h2 className="Empty-Title">No Favorites Yet</h2>
        }
        else{
            if(props.cities.length>0){
                return <div className="Favorite-Page"> 
                {props.cities.map(City =>{
                    return <Link to="/" onClick={()=>{sendInfo(City)}} key={City.selectedCity.Key}><div className="Daily">
                        <p className="Center Bigger">{City.selectedCity.LocalizedName}</p>
                        {DateString(City.cityData[0].LocalObservationDateTime)}
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
            {checkFavorites()}
        </div>
    )
}
