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

export default function DayComp(props) {
    const [isDay, setIsDay] = useState(true)
    
    function getIcon(IconValue){
        if(IconValue===1||IconValue===2){
            return <img className="weather-icon" src={dayIcon} alt="sun Icon by AmCharts"/>
        }
        else if(IconValue===3){
            return <img className="weather-icon" src={cloudyDay1Icon} alt="cloudy Icon by AmCharts"/>
        }
        else if(IconValue===4){
            return <img className="weather-icon" src={cloudyDay2Icon} alt="cloudy Icon by AmCharts"/>
        }
        else if(IconValue===5||IconValue===6){
            return <img className="weather-icon" src={cloudyDay3Icon} alt="cloudy Icon by AmCharts"/>
        }
        else if(IconValue===7||IconValue===8||IconValue===11||IconValue===30||IconValue===31||IconValue===32){
            return <img className="weather-icon" src={cloudyIcon} alt="cloudy Icon by AmCharts"/>
        }
        else if(IconValue===12||IconValue===39||IconValue===40){
            return <img className="weather-icon" src={rainy4Icon} alt="rainy Icon by AmCharts"/>
        }
        else if(IconValue===13){
            return <img className="weather-icon" src={rainy2Icon} alt="rainy Icon by AmCharts"/>
        }
        else if(IconValue===14){
            return <img className="weather-icon" src={rainy1Icon} alt="rainy Icon by AmCharts"/>
        }
        else if(IconValue===15||IconValue===16||IconValue===17||IconValue===41||IconValue===42){
            return <img className="weather-icon" src={thunderIcon} alt="thunder Icon by AmCharts"/>
        }
        else if(IconValue===18||IconValue===25){
            return <img className="weather-icon" src={rainy6Icon} alt="rainy Icon by AmCharts"/>
        }
        else if(IconValue===19||IconValue===43){
            return <img className="weather-icon" src={snowy4Icon} alt="snowy Icon by AmCharts"/>
        }
        else if(IconValue===20){
            return <img className="weather-icon" src={snowy2Icon} alt="snowy Icon by AmCharts"/>
        }
        else if(IconValue===21){
            return <img className="weather-icon" src={snowy1Icon} alt="snowy Icon by AmCharts"/>
        }
        else if(IconValue===22){
            return <img className="weather-icon" src={snowy6Icon} alt="snowy Icon by AmCharts"/>
        }
        else if(IconValue===23){
            return <img className="weather-icon" src={snowy3Icon} alt="snowy Icon by AmCharts"/>
        }
        else if(IconValue===24||IconValue===44){
            return <img className="weather-icon" src={snowy5Icon} alt="snowy Icon by AmCharts"/>
        }
        else if(IconValue===25||IconValue===29){
            return <img className="weather-icon" src={rainy7Icon} alt="rainy Icon by AmCharts"/>
        }
        else if(IconValue===33||IconValue===34){
            return <img className="weather-icon" src={nightIcon} alt="moon Icon by AmCharts"/>
        }
        else if(IconValue===35){
            return <img className="weather-icon" src={cloudyNight1Icon} alt="cloudy Icon by AmCharts"/>
        }
        else if(IconValue===36){
            return <img className="weather-icon" src={cloudyNight2Icon} alt="cloudy Icon by AmCharts"/>
        }
        else if(IconValue===37||IconValue===38){
            return <img className="weather-icon" src={cloudyNight3Icon} alt="cloudy Icon by AmCharts"/>
        }
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

    function convertToDateString(date){
        const day = new Date(date)
        return <span className="Bigger">{day.toDateString()}</span>
    }

    return (
        <div className="Daily">
            <div className="Forecast-Header">
                <div className="space-between">
                    {convertToDateString(props.self.Date)}
                    <div className="button-toggle">
                        <input type="checkbox" className="weather-checkbox" onChange={()=>{setIsDay(!isDay)}}/>
                        <div className="weather-knobs"></div>
                        <div className="weather-layer"></div>
                    </div>
                </div>
                <p className="indent">{Math.floor(toggleTemperature(props.self.Temperature.Minimum.Value))+toggleTemperatureUnit()} - {Math.floor(toggleTemperature(props.self.Temperature.Maximum.Value))+toggleTemperatureUnit()}</p>
            </div>
            {isDay? <div className="Forecast-Content">
                <div className="Center">
                    <span className="Bigger">{props.self.Day.ShortPhrase}</span>
                    {getIcon(props.self.Day.Icon)}
                </div>
                <div className="space-evenly">
                    <p>Rain: {props.self.Day.Rain.Value} {props.self.Day.Rain.Unit}</p>
                    <p>Snow: {props.self.Day.Snow.Value} {props.self.Day.Snow.Unit}</p>
                </div>
            </div> : <div className="Forecast-Content">
                <div className="Center">
                    <span className="Bigger">{props.self.Night.ShortPhrase}</span>
                    {getIcon(props.self.Night.Icon)}
                </div>
                <div className="space-evenly">
                    <p>Rain: {props.self.Night.Rain.Value} {props.self.Night.Rain.Unit}</p>
                    <p>Snow: {props.self.Night.Snow.Value} {props.self.Night.Snow.Unit}</p>
                </div>
            </div>}
        </div>
    )
}
