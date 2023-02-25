import React, { useContext } from 'react'
import {
    Link, useLocation
} from "react-router-dom";
import { AuthContext } from '../context/authContext';
import Logo from "../img/logo.png"

const Navbar = () => {
    //GET CURRENT LOCATION OBJECT
    const location = useLocation()

    //GET CURRENT USER OBJECT AND LOGOUT FUNCTION
    const { currentUser, logout } = useContext(AuthContext)

    //CHECK IF USER IS AT HOMEPAGE
    const isHome = location.pathname === '/'

    return (
        <div className='navBar'>
            <div className="container">
                {/* Page logo  */}
                <Link className='link logo' to="/">
                    <img src={Logo} alt="Logo" />
                </Link>
                {/* Buttons  */}
                <div className="links">
                    <Link className='link' to="/">
                        Home
                    </Link>
                    <Link className='link' to="/?cat=local">
                        Local
                    </Link>
                    <Link className='link' to="/?cat=world">
                        World
                    </Link>
                    {currentUser &&
                        <div>
                            {currentUser?.username}
                        </div>
                    }

                    {/* ONLY RENDER LOGIN, LOGOUT AND WRITE BUTTONS WHEN AT HOME */}
                    {isHome && (
                        <>
                            {currentUser ?
                                <div className='link' onClick={logout}>
                                    Logout
                                </div>
                                :
                                <Link className='link accountLink' to="/account">
                                    Login
                                </Link>
                            }
                            {currentUser ?
                                <Link className='link' to="/write">
                                    Write
                                </Link>
                                :
                                <Link className='link' to="/account">
                                    Write
                                </Link>}
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Navbar