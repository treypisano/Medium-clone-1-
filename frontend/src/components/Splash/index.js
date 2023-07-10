import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './splash.css'
import Modal from './LoginPopup';
import TrendingBar from '../TrendingBar';
import ArticleList from '../ArticleList';
import HomePage from '../HomePage';
import BottomHalf from '../BottomHalf';
import NavBar from '../NavBar';
import splashGif from "./output-onlinegiftools.gif"
export const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
export const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"

export default function Splash() {
    const sessionUser = useSelector(state => state.users);
    const loggedIn  = useSelector(state => state.utilities.loggedIn)
    const [loginPopup, setLoginPopup] = useState(false)

    const dispatch = useDispatch()

    function handleSignInClick() {
        dispatch({type: OPEN_MODAL, payload: "signIn"})
    }

    function handleSignUpClick() {
        dispatch({type: OPEN_MODAL, payload: "signUp"})
    }

    if ((Object.keys(sessionUser).length !== 0) && loggedIn) { // if logged in
        return <HomePage loggedIn={true}/>;
    }

    return (
        <div className='splash '>
            <NavBar />
            <div className='whole-top-half'>
                <div className="top-half">
                    <div className='under-nav'>
                        <div id="left-gif">
                        <h2 className='stay-curious'>Stay Luxurious.</h2>
                        <div className='wrap-discover'>
                            <h3 className='discover'>Discover stories, thinking, and expertise from writers on any topic.</h3>
                        </div>
                        <p className="start-reading" onClick={handleSignUpClick}>Start reading</p>
                        </div>
                        <img id='splash-gif' src={splashGif}/>
                    </div>
                </div>
            </div>
        <BottomHalf/>
        </div>
    )
}