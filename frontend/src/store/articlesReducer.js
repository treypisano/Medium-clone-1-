import { csrfFetch } from "./usersReducer"

export const RECEIVE_ARTICLES = "articles/RECIEVE_ARTICLES"

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

export default function articlesReducer( state = {}, action ) {

    switch (action.type) {
        case RECEIVE_ARTICLES:
            return action.articles
        default:
            return state
    }
}