import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './splash.css'
import logo from './icons8-pie-chart-64.png'
import Modal from './LoginPopup';
import TrendingBar from '../TrendingBar';
import ArticleList from '../ArticleList';
import HomePage from '../HomePage';
import BottomHalf from '../BottomHalf';
import NavBar from '../NavBar';
const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"


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
            <div className='whole-top-half'>
                <div className="top-half">
                    <NavBar />
                    <div className='under-nav'>
                        <h2 className='stay-curious'>Stay Luxurious.</h2>
                        <div className='wrap-discover'>
                            <h3 className='discover'>Discover stories, thinking, and expertise from writers on any topic.</h3>
                        </div>
                        <p className="start-reading">Start reading</p>
                    </div>
                </div>
            </div>
        <BottomHalf/>
        <Modal />
        </div>
    )
}