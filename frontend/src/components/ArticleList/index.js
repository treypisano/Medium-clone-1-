import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchArticles, RECEIVE_ARTICLES } from '../../store/articlesReducer';

export default function ArticleList() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])


}