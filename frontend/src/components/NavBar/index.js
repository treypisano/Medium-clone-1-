import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import logo from './icons8-pie-chart-64.png'
import { logoutUser } from "../../store/usersReducer";
import { LOG_OUT } from "../../store/utilitiesReducer";
import { useState } from "react";


const OPEN_MODAL = "utilities/modal/OPEN_MODAL"

export default function NavBar() {
    const loggedIn = useSelector(state => state.utilities.loggedIn)
    const currentUser = useSelector(state =>  Object.values(state.users).slice(-1)[0])

    const history = useHistory()

    const dispatch = useDispatch()

    function handleSignInClick() {
        dispatch({type: OPEN_MODAL, payload: "signIn"})
    }

    function handleSignUpClick() {
        dispatch({type: OPEN_MODAL, payload: "signUp"})
    }

    function handleSignOutClick() {
        dispatch(logoutUser(currentUser.id))
        dispatch({type: LOG_OUT, payload: "logging out"})
        history.push("/")
    }


    // insert show page class if on show page
    return (
        <div className={`whole-nav-bar ${loggedIn ? "nav-bar-show-page" : ""}`}> 
            <div className='Nav-Bar'>
                <div className='logo'>
                    <Link to="/">
                        <img href="/" src={logo}></img>
                        <p id="title">Premium</p>    
                    </Link>  
                </div>
                <div className='Nav-Links'>
                    <p>Our story</p>
                    <p>Membership</p>
                    {
                        loggedIn ? 
                        <>
                            <Link to="/articles/create">
                                <p>Write</p>
                            </Link>
                            <p onClick={handleSignOutClick} >Sign Out</p>
                        </> :
                        <>
                        <p onClick={handleSignInClick} className='Sign-In'>Sign In</p>
                        <p onClick={handleSignUpClick} id="Get-Started">Get Started</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}