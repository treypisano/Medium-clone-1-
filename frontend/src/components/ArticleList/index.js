import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchArticles } from '../../store/articlesReducer';

export default function ArticleList() {
    const articles = useSelector(state => Object.values(state.articles))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])


    return (
        <div className="article-list">
            {articles.map(article => (
                <div key={article.id}>
                    <h3>{article.title}</h3>
                    <p>{article.body.slice(0, 136)}</p>
                </div>
            ))}
        </div>
    )
}