import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchArticles } from '../../store/articlesReducer';
import './articleList.css'

export default function ArticleList() {
    const articles = useSelector(state => Object.values(state.articles).reverse())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      
   
    function numToMonth(numAsString) {
        let monthNum = parseInt(numAsString)
        return months[monthNum]
    }

    function formatDate(article) {
        const splitDate = article.createdAt.split("-")
        const month = numToMonth(splitDate[1] -1)    
        return `${month} ${splitDate[2].slice(0,2)}`
    }

    return (
        <div className="article-list">
            {articles.map(article => (
                <div key={article.id}>
                    <p className="author">{article.author}</p>
                    <h3 className="article-list-title">{article.title}</h3>
                    <p className="article-snippet">{article.body.slice(0, 136)}</p>
                    <div className="date-min-read-tag">
                        <p>{formatDate(article)}
                        </p>
                        <p>5 min read</p>
                    </div>
                </div>
            ))}
        </div>
    )
}