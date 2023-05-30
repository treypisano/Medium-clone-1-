import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import './splash.css'
import logo from './icons8-pie-chart-64.png'

export default function Splash() {

    return (
        <div className='Nav-Bar'>
            <div className='Logo'>
                <img href="/login" src={logo}></img>
            </div>
            <div className='Middle'>
            </div>
            <div className='Nav-Links'>
                <p>Our story</p>
                <p>Membership</p>
                <a href='/login'>Sign In</a>
                <p>Get Started</p>
            </div>
        </div>
    )
}