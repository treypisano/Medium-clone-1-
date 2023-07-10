import { csrfFetch } from "./usersReducer"

export const RECEIVE_ARTICLES = "articles/RECIEVE_ARTICLES"
export const RECEIVE_ARTICLE = "articles/RECIEVE_ARTICLE"
export const RECIEVE_CLAP = "articles/RECIEVE_CLAP"
export const RECIEVE_COMMENT = "articles/RECIEVE_COMMENT"
export const EDIT_COMMENT = "articles/EDIT_COMMENT"
export const DELETE_COMMENT = "articles/DELETE_COMMENT"
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

export const editComment = (incomingComment) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${incomingComment.comment.id}`, {
        method: 'PATCH', 
        body: JSON.stringify(incomingComment)
    })
    const comment = await res.json()

    if (res.ok) {
        dispatch({type: EDIT_COMMENT, payload: {comment: comment}})
        return comment
    }
}

export const deleteComment = (commentId) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    const comment = await res.json()

    if (res.ok) {
        dispatch({type: DELETE_COMMENT, payload: {comment: comment}})
    }
}

function addClapToArticles(state, clap) {
    let currentArticleId = clap.article_id

    state[currentArticleId].claps.concat([clap])
    return state
}

export default function articlesReducer( state = {}, action ) {
    let previousComments;
    let clonedState;
    let currentArticleId;

    switch (action.type) {
        case RECEIVE_ARTICLES:
            return action.articles
        case RECEIVE_ARTICLE:
            return action.article
        case RECIEVE_CLAP:
            return state
        case RECIEVE_COMMENT:
            currentArticleId = action.payload.comment.articleId;
            clonedState = structuredClone(state)
            
            if (!clonedState[currentArticleId].comments) {
                clonedState[currentArticleId].comments = {}
            }
            previousComments = clonedState[currentArticleId].comments;
            previousComments[action.payload.comment.id] = action.payload.comment
            return clonedState;
        case EDIT_COMMENT:
            currentArticleId = action.payload.comment.articleId;
            clonedState = structuredClone(state)
        
            previousComments = clonedState[currentArticleId].comments;
            previousComments[action.payload.comment.id] = action.payload.comment
            return clonedState;
        case DELETE_COMMENT: 
            currentArticleId = action.payload.comment.articleId;
            clonedState = structuredClone(state)
        
            previousComments = clonedState[currentArticleId].comments;
            delete previousComments[action.payload.comment.id]
            return clonedState;
        default:
            return state
    }
}