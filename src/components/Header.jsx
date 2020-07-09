  
import React from 'react'
import {Link} from 'react-router-dom'

export default function MenuNav() {
    return (
        <div className="nav-bar">
            <h2 className="nav-title">My Weather</h2>
            <ul className="nav-links">
                <Link to="/"><li>Home</li></Link>
                <Link to="/favorites"><li>Favorites</li></Link>
            </ul>
        </div>
    )
}