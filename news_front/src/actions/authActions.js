import axios from 'axios'
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGOUT
} from './types'

import qs from 'querystring'
import { BACKEND_URL } from '../const'
import { login, logout } from '../auth'


export const submitLogin = (username, password) => {
    return async dispatch => {

        dispatch({
            type: AUTH_LOGIN_REQUEST
        })

        const url = BACKEND_URL + "/auth/token"

        try {
            const bodyArgs = {
                grant_type: "password",
                username,
                password,
            }
    
            const resp = await axios.post(url, qs.stringify(bodyArgs), 
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

            console.log(resp)
    
            const { access_token } = resp.data
            login(access_token)
            
            dispatch({
                type: AUTH_LOGIN_SUCCESS,
                payload: "Bearer" + access_token
            })
    
        } catch (e) {
            console.warn("FAILED TO LOGIN")
            console.warn(e)

            logout()
            dispatch({
                type: AUTH_LOGIN_ERROR,
                payload: "Falha ao realizar login"
            })
        }
    }
}


export const performLogout = () => {
    logout()
    return {
        type: AUTH_LOGOUT
    }
}