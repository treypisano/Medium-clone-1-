const ADD_ERROR = "errors/ADD_ERROR"
const REMOVE_ERRORS = "errors/REMOVE_ERROR"

export default function errorsReducer (state = {}, action) {
   
    switch (action.type) {
        case ADD_ERROR:
            // keys same as values
            return Object.values(action.payload)
        case REMOVE_ERRORS:
            return {}
        default:
            return state 
    }
}