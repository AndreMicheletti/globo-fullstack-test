import { BACKEND_URL } from '../const'
import api from '../service'

import {
    ARTICLE_GET_ALL_REQUEST,
    ARTICLE_GET_ALL_SUCCESS,
    ARTICLE_GET_ALL_ERROR,
    ARTICLE_POST_REQUEST,
    ARTICLE_POST_ERROR,
    ARTICLE_POST_SUCCESS
} from './types'


export const articleGetAll = () => {
    return async dispatch => {

        const url = "article/"

        dispatch({
            type: ARTICLE_GET_ALL_REQUEST,
            payload: url
        })

        try {
            const response = await api.get(url)
            
            console.log(response)

            dispatch({
                type: ARTICLE_GET_ALL_SUCCESS,
                payload: response.data
            })

        } catch (e) {
            console.warn("ACTION FAILED!!")
            console.warn(e)

            dispatch({
                type: ARTICLE_GET_ALL_ERROR
            })
        }

    }
}

export const articlePost = (title, content) => {
    return async dispatch => {

        const url = "article/"

        dispatch({
            type: ARTICLE_POST_REQUEST,
            payload: url
        })

        try {
            const response = await api.post(url, {
                title, content
            })

            console.log(response)

            dispatch({
                type: ARTICLE_POST_SUCCESS,
            })

        } catch (e) {
            console.warn("ACTION FAILED!!")
            console.warn(e)

            dispatch({
                type: ARTICLE_POST_ERROR
            })
        }

    }
}
