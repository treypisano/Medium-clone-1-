import { csrfFetch } from "./usersReducer"

export const RECEIVE_ARTICLES = "articles/RECIEVE_ARTICLES"
export const RECEIVE_ARTICLE = "articles/RECIEVE_ARTICLE"

// ACTION CREATORS

export const recieveArticles = articles => {
    return {
        type: RECEIVE_ARTICLES,
        articles
    }
}

export const fetchArticles = () => async(dispatch, getState) => { // fetch articles and save in store
    let res = await csrfFetch('api/articles')
    let articles = await res.json() // a JS object of articles
    
    dispatch(recieveArticles(articles))
}

export const createArticle = (article) => async dispatch => {
    const res = await csrfFetch('/api/articles', {
        method: 'POST', 
        body: JSON.stringify(article)
    })
}

export const deleteArticle = (articleId) => async dispatch => {
    const res = await csrfFetch(`/api/articles/${articleId}`, {
        method: 'DELETE'
    })
}

export const editArticle = (article) => async dispatch => {
    const res = await csrfFetch(`/api/articles/${article.id}`, {
        method: 'PATCH',
        body: JSON.stringify(article)
    })
}

export default function articlesReducer( state = {}, action ) {
    switch (action.type) {
        case RECEIVE_ARTICLES:
            return action.articles
        case RECEIVE_ARTICLE:
            return action.article
        default:
            return state
    }
}