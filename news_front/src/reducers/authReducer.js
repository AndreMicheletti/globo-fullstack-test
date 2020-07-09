import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGOUT,
} from '../actions/types'


const INITIAL_STATE = {
    loading: false,
    error: false,
    authToken: null
}


const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                loading: true,
                error: false,
                authToken: null
            }
        case AUTH_LOGIN_SUCCESS:
            return {
                loading: false,
                error: false,
                authToken: action.payload
            }
        case AUTH_LOGIN_ERROR:
            return {
                loading: false,
                error: action.payload,
                authToken: null
            }
        case AUTH_LOGOUT:
            return {
                loading: false,
                error: false,
                authToken: null
            }
        default:
            return state
    }
}

export default authReducer;
