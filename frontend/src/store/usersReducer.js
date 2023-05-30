// ACTION TYPES
const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

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

// THUNK ACTION CREATORS
export const loginUser = user => async dispatch => {
    debugger
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    
    dispatch(receiveUser(data.user))
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

    dispatch(receiveUser(data.user));
}

// REDUCER
const usersReducer = ( state = {}, action ) => {
    const nextState = { ...state };
    switch(action.type) {
        case RECEIVE_USER:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }
};

export default usersReducer