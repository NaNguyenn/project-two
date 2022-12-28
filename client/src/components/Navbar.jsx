import React, { useContext } from 'react'
import {
    Link
} from "react-router-dom";
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.png"

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)

    return (
        <div className='navBar'>
            <div className="container">
                <div className="logo"><img src={Logo} alt="Logo" /></div>
                <div className="links">
                    <Link className='link' to="/">Home</Link>
                    <Link className='link' to="/?cat=local">Local</Link>
                    <Link className='link' to="/?cat=world">World</Link>
                    {currentUser ? <div onClick={logout}>Logout</div> : <Link className='link accountLink' to="/account">Login</Link>}
                    <div>{currentUser?.username}</div>
                    <Link className='link' to="/write">Write</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar