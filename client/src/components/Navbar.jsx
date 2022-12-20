import React from 'react'
import {
    Link
} from "react-router-dom";
import Logo from "../img/logo.png"

const Navbar = () => {
    return (
        <div className='navBar'>
            <div className="container">
                <div className="logo"><img src={Logo} alt="Logo" /></div>
                <div className="links">
                    <Link className='link' to="/?cat=local">Local</Link>
                    <Link className='link' to="/?cat=world">World</Link>
                    <Link className='link accountLink' to="/account">Login & Register</Link>
                    <div>Nguyen</div>
                    <div className='write'>Write</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar