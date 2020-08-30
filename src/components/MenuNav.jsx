import React from 'react'
import {Link} from 'react-router-dom'

export default function MenuNav(props) {

    function handleCheckbox(){
        props.TempUnit()
    }

    return (
        <div className="nav-bar">
            <h2 className="nav-title">My Weather</h2>
            <ul className="nav-links">
                <Link to="/"><li>Home</li></Link>
                <Link to="/favorites"><li>Favorites</li></Link>
                <li>
                    <div className="button" id="button">
                        <input type="checkbox" className="checkbox" onChange={handleCheckbox}/>
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
