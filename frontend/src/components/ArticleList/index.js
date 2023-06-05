import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchArticles } from '../../store/articlesReducer';
import samplePic from './sample_pic.jpg'
import './articleList.css'

export function formatDate(article) {
    const splitDate = article.createdAt.split("-")
    const month = numToMonth(splitDate[1] -1)    
    return `${month} ${splitDate[2].slice(0,2)}`
}

export function numToMonth(numAsString) {
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let monthNum = parseInt(numAsString)
    return months[monthNum]
}

export default function ArticleList() {
    const articles = useSelector(state => Object.values(state.articles).reverse())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    return (
        <div className='whole-article-list'>
            <div className="article-list">
                {articles.map(article => (
                    <div className='article-and-picture' key={article.id}>
                        <div key={article.id}>
                            <p className="author">{article.email}</p>
                            <h3 className="article-list-title">{article.title}</h3>
                            <p className="article-snippet">{article.body.slice(0, 136)}</p>
                            <div className="date-min-read-tag">
                                <p>{formatDate(article)}
                                </p>
                                <p>5 min read</p>
                            </div>
                        </div>
                        <a className='link-to-article'>
                            <img className='article-img' src={samplePic}></img>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}