import {
    ARTICLE_GET_ALL_REQUEST,
    ARTICLE_GET_ALL_SUCCESS,
    ARTICLE_GET_ALL_ERROR,
} from '../actions/types'


const INITIAL_STATE = {
    loading: false,
    error: false
}

const dashboardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ARTICLE_GET_ALL_REQUEST:
            return {
                loading: true,
                error: false
            }
        case ARTICLE_GET_ALL_SUCCESS:
            return {
                loading: false,
                error: false
            }
        case ARTICLE_GET_ALL_ERROR:
            return {
                loading: false,
                error: true
            }
        default:
            return state
    }
}

export default dashboardReducer
