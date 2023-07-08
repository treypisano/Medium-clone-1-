// ACTION TYPES
const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';
const ADD_ERROR = "errors/ADD_ERROR"
const REMOVE_ERRORS = "errors/REMOVE_ERROR"
const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"
const LOG_IN = "utilities/loggedIn/LOG_IN"
const LOG_OUT = "utilities/loggedIn/LOG_OUT"
const RECIEVE_FOLLOW = "users/RECIEVE_FOLLOW"
const REMOVE_FOLLOW = "users/remove_follow"

// ACTION CREATORS
export const csrfFetch = async (url, options = {}) => {
    options.method ||= 'GET';
    options.headers ||= {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = 'application/json';
        options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }

    const res = await fetch(url, options);
    return res
}

export const receiveUser = user => ({
    type: RECEIVE_USER,
    payload: user
});

export const removeUser = userId => ({
    type: REMOVE_USER,
    userId
});

export const recieveFollow = follow => ({
    type: RECIEVE_FOLLOW,
    follow
})

// THUNK ACTION CREATORS
export const loginUser = user => async dispatch => { // {user: {username: trey, password: password}}
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json(); // data should be the errors
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    

    if (data.errors){
        dispatch({ type: ADD_ERROR, payload: data }) // if theres errors, add to state
    } else {
        dispatch(receiveUser(data.user))
        dispatch({ type: CLOSED_MODEL, payload: "closing modal" })
    }

    return data
};

export const logoutUser = userId => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    sessionStorage.setItem('currentUser', null)
    dispatch(removeUser(userId));
}

export const createUser = user => async dispatch => {
    let res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    if (data.length > 0 || data.errors){
        dispatch({ type: ADD_ERROR, payload: data }) // if theres errors, add to state
    } else {
        dispatch(receiveUser(data.user))
        dispatch({ type: CLOSED_MODEL, payload: "closing modal" })
    }

    return data
}

// REDUCER
const usersReducer = ( state = {}, action ) => {
    const nextState = { ...state };
    let clonedState = structuredClone(state)
    let currentUser = Object.values(clonedState)[0]
    switch(action.type) {
        case RECEIVE_USER:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        case RECIEVE_FOLLOW:
            let followedUsers = currentUser.followedUsers
            followedUsers[action.follow.id] = action.follow
            return clonedState;
        case REMOVE_FOLLOW:
            return clonedState;
        default:
            return state;
    }
};

export default usersReducer