import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../store/usersReducer';
import { formatDate, numToMonth } from '../ArticleList';
import  trendingIcon  from './trending.png'
import "./trendingbar.css" 

export default function TrendingBar() {
    const articles = useSelector(state => Object.values(state.articles).reverse().slice(0,6)) 
    // pulls 6 articles from state
    
    let gridNum = 0 // a counter assign grid class names to each grid ele
    return (
        <>
        <div className="trending-bar-wrapper">
        <div className='trending-bar-main-title default-width'>
            <img className='trending-icon' src={trendingIcon} alt="/"></img>
            <h3 >Trending on Premium</h3>     
        </div>
            <div className='trending-bar'>
                {articles.map((article, index) => {
                    return (
                    <div className={`single-trending-bar-ele box-${index}`} key={index}>
                        <div className='trending-left-side'>
                            <p>{`0${index+1}`}</p>
                        </div>
                        <div className='trending-right-side'>
                            <p className="trending-bar-author">{article.email.split("@")[0]}</p>
                            <p className='trending-bar-title'>{article.title.slice(0,40)}</p> 
                            <div className="date-min-read-tag">
                                <p>{formatDate(article)}
                                </p>
                                <p>5 min read</p>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        </div>
        </>
    )
}