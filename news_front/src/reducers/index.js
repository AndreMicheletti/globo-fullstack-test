import { combineReducers } from 'redux'
import articlesReducer from './articlesReducer'
import dashboardReducer from './dashboardReducer'
import formReducer from './formReducer'

export default combineReducers({
    articles: articlesReducer,
    dashboard: dashboardReducer,
    form: formReducer,
})
