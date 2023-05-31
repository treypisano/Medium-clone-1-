const OPEN_MODAL = "utilities/modal/OPEN_MODAL"
const CLOSED_MODEL = "utilities/modal/CLOSE_MODAL"

export default function utilitiesReducer (state = {}, action) {
    const nextState = {...state}
    // debugger 
    switch (action.type) {
        case OPEN_MODAL:
            nextState.modalOpen = true // hit sign in button
            return nextState
        case CLOSED_MODEL:
            nextState.modalOpen = false // hit x, or successful sign in
            return nextState
        default:
            return state 
    }
}