import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './splash.css'
import logo from './icons8-pie-chart-64.png'
import Modal from './LoginPopup';
const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"

export default function Splash() {
    const [loginPopup, setLoginPopup] = useState(false)
    const dispatch = useDispatch()

    function handleSignInClick() {
        dispatch({type: OPEN_MODAL, payload: "signIn"})
    }

    function handleSignUpClick() {
        dispatch({type: OPEN_MODAL, payload: "signUp"})
    }

    return (
        <div className='splash'>
            <div className='Nav-Bar'>
                <div className='logo'>
                    <Link to="/">
                        <img href="/" src={logo}></img>
                        <p id="title">Premium</p>    
                    </Link>  
                </div>
                    {/* <div className='Middle'>
                    </div> */}
                <div className='Nav-Links'>
                    <p>Our story</p>
                    <p>Membership</p>
                    <p onClick={handleSignInClick} className='Sign-In'>Sign In</p>
                    <p onClick={handleSignUpClick}>Get Started</p>
                </div>
            </div>
            <div className='under-nav'>
                <h2>Stay Curious</h2>
                <h3>Discover stories, thinking, and expertise from writers on any topic.</h3>
                <p>Start reading</p>
            </div>
                <Modal />
        </div>
    )
}