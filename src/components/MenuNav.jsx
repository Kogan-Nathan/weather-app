import React from 'react'
import {Link} from 'react-router-dom'

export default function MenuNav(props) {

    function toggleTempValue(){
        props.UpdateTempValue()
    }

    return (
        <div className="nav-bar">
            <h2 className="nav-title">My Weather</h2>
            <ul className="nav-links">
                <Link to="/"><li>Home</li></Link>
                <Link to="/favorites"><li>Favorites</li></Link>
                <li>
                    <div className="button">
                        <input type="checkbox" className="checkbox" onChange={toggleTempValue}/>
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
