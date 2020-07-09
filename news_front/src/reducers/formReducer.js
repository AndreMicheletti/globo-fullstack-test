import {
    ARTICLE_POST_REQUEST,
    ARTICLE_POST_SUCCESS,
    ARTICLE_POST_ERROR,
} from '../actions/types'


const INITIAL_STATE = {
    loading: false,
    error: false
}

const formReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ARTICLE_POST_REQUEST:
            return {
                loading: true,
                error: false
            }
        case ARTICLE_POST_SUCCESS:
            return {
                loading: false,
                error: false
            }
        case ARTICLE_POST_ERROR:
            return {
                loading: false,
                error: true
            }
        default:
            return state
    }
}

export default formReducer
