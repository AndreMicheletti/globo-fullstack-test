import {
    ARTICLE_GET_ALL_SUCCESS,
    ARTICLE_GET_ALL_ERROR,
} from '../actions/types'


const INITIAL_STATE = [
]

const articlesReducer = (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case ARTICLE_GET_ALL_SUCCESS:
            return action.payload
        case ARTICLE_GET_ALL_ERROR:
            return []
        default:
            return state
    }
}

export default articlesReducer
