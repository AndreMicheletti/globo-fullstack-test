import { combineReducers } from 'redux'
import articlesReducer from './articlesReducer'
import dashboardReducer from './dashboardReducer'
import formReducer from './formReducer'
import authReducer from './authReducer'


export default combineReducers({
    articles: articlesReducer,
    dashboard: dashboardReducer,
    form: formReducer,
    auth: authReducer
})
