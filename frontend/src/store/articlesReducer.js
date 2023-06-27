import { csrfFetch } from "./usersReducer"

export const RECEIVE_ARTICLES = "articles/RECIEVE_ARTICLES"
export const RECEIVE_ARTICLE = "articles/RECIEVE_ARTICLE"
export const RECIEVE_CLAP = "articles/RECIEVE_CLAP"
export const RECIEVE_COMMENT = "articles/RECIEVE_COMMENT"
// ACTION CREATORS

export const recieveArticles = articles => {
    return {
        type: RECEIVE_ARTICLES,
        articles
    }
}

export const fetchArticles = () => async(dispatch, getState) => { // fetch articles and save in store
    let res = await csrfFetch('/api/articles')
    let articles = await res.json() // a JS object of articles
    dispatch(recieveArticles(articles))

    return articles
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

export const recieveClap = (clap) => async dispatch => {
    const res = await csrfFetch(`/api/claps`, {
        method: 'POST', 
        body: JSON.stringify(clap)
    })
    
    const recievedClap = await res.json()
    
    dispatch({type: RECIEVE_CLAP, payload: recievedClap})
}

export const createComment = (newComment) => async dispatch => {
    const res = await csrfFetch('/api/comments', {
        method: 'POST', 
        body: JSON.stringify(newComment)
    })
    const comment = await res.json()
    
    dispatch({type: RECIEVE_COMMENT, payload: {comment: comment}})
}

function addClapToArticles(state, clap) {
    let currentArticleId = clap.article_id

    state[currentArticleId].claps.concat([clap])
    return state
}

export default function articlesReducer( state = {}, action ) {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_ARTICLES:
            return action.articles
        case RECEIVE_ARTICLE:
            return action.article
        case RECIEVE_CLAP:
            return state
        case RECIEVE_COMMENT:
            // Must deeply clone ALL levels of the state with structured clone
            // Only can clone if values actually exists
            
            const currentArticleId = action.payload.comment.articleId;
            let clonedState = structuredClone(state)
            
            const previousComments = clonedState[currentArticleId].comments;
            previousComments[action.payload.comment.id] = action.payload.comment
            // If previous comments exist, add one to the last index, if not, just set comment index to 0
            // if (previousComments) {
            //     const mostRecentCommentId = Object.keys(previousComments).slice(-1)[0];
            //     previousComments[parseInt(mostRecentCommentId) + 1] = action.payload.comment;
            // } else {
            //     clonedState[currentArticleId].comments = {}
            //     clonedState[currentArticleId].comments[0] = action.payload.comment;
            // }
            
            return clonedState;
        default:
            return state
    }
}