import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../store/usersReducer';
import "./trendingbar.css" 

export default function TrendingBar() {
    const articles = useSelector(state => Object.values(state.articles).reverse().slice(0,6)) 
    // pulls 6 articles from state
    
    // debugger

    let gridNum = 0 // a counter assign grid class names to each grid ele
    return (
        <>
        <div className="trending-bar-wrapper">
            <div className='trending-bar'>
                {articles.map((article, index) => {
                    return (
                    <div className={`single-trending-bar-ele box-${index}`} key={index}>
                        <p className="author">{article.author}</p>
                        <p >{article.title}</p> 
                    </div>)
                })}
            </div>
        </div>
        </>
    )
}