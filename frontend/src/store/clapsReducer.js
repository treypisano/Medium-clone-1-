import { csrfFetch } from "./usersReducer";

const RECEIVE_CLAPS = "receiveclaps"
const RECIEVE_CLAP = "receiveclap"
const REMOVE_CLAP = "removeclap"

export default function clapsReducer (state = {}, action) {
   
    switch (action.type) {
        case RECEIVE_CLAPS:
            return action.payload;
        case RECIEVE_CLAP:
            return {...state, ...action.payload}
        case REMOVE_CLAP:
            const newState = {...state}
            delete newState[Object.keys(action.payload)[0]]
            
            return newState
        default:
            return state
    }
}

export const recieveClaps = (articleId) => async(dispatch) => {
    const res = await csrfFetch(`/api/articles/${articleId}/claps`, {
        method: "GET"
    })
    const claps = await res.json()
    
    dispatch({type: RECEIVE_CLAPS, payload: claps})
}


export const recieveClap = (clap) => async dispatch => {
    const res = await csrfFetch(`/api/claps`, {
        method: 'POST', 
        body: JSON.stringify(clap)
    })
    
    const recievedClap = await res.json()
    
    dispatch({type: RECIEVE_CLAP, payload: recievedClap})
    return recievedClap
}

export const deleteClap = (userId, articleId) => async dispatch => {
    const res = await csrfFetch(`/api/claps/${userId}/${articleId}`, {method: 'GET'})

    const deletedClap = await res.json()

    dispatch({type: REMOVE_CLAP, payload: deletedClap})
    return deletedClap
}