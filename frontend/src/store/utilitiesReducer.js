const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"
const LOG_IN = "utilities/loggedIn/LOG_IN"
const LOG_OUT = "utilities/loggedIn/LOG_OUT"


export default function utilitiesReducer (state = {}, action) {
    const nextState = {...state}

    switch (action.type) {
        case OPEN_MODAL:
            nextState.modalOpen = action.payload // hit sign in button
            return nextState
        case CLOSED_MODEL:
            nextState.modalOpen = action.payload // hit x, or successful sign in
            return nextState
        default:
            return state 
    }
}