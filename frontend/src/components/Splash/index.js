import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './splash.css'
import logo from './icons8-pie-chart-64.png'
import Modal from './LoginPopup';
import ArticleList from '../ArticleList';
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

        <div className='splash '>
            <div className='whole-top-half'>
                <div className="top-half">
                    <div className='whole-nav-bar'>
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
                                <p onClick={handleSignUpClick} id="Get-Started">Get Started</p>
                            </div>
                        </div>
                    </div>
                    <div className='under-nav'>
                        <h2 className='stay-curious'>Stay Luxurious.</h2>
                        <div className='wrap-discover'>
                            <h3 className='discover'>Discover stories, thinking, and expertise from writers on any topic.</h3>
                        </div>
                        <p className="start-reading">Start reading</p>
                    </div>
                </div>
            </div>
        <div className='whole-bottom-half'>
            <div className='bottom-half default-width'>
                <div className='bottom-half-grid'>
                    <div className='left-side-grid'>
                        <ArticleList />
                    </div>
                    <div className='right-side-grid'>
                        <div className='tags'>
                            <h2 className='tags-title'>Discover more of what matters to you</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal />
        </div>
    )
}