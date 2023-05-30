import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './splash.css'
import logo from './icons8-pie-chart-64.png'
import Modal from './LoginPopup';

export default function Splash() {
    const [loginPopup, setLoginPopup] = useState(false)

    function handleSignInClick() {
        setLoginPopup(!loginPopup) // when clicked, set popup to opposite of what is currently is
        console.log(loginPopup)
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
                    <p onClick={handleSignInClick}>Sign In</p>
                    <p>Get Started</p>
                </div>
            </div>
            <div className='under-nav'>
                <h2>Stay Curious</h2>
                <h3>Discover stories, thinking, and expertise from writers on any topic.</h3>
                <p>Start reading</p>
            </div>
            <Modal loginPopup={loginPopup}/>
        </div>
    )
}