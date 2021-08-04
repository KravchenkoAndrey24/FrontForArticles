import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "./isAuthReducer";
import { articlesReducer } from "./articlesReducer";
import {appReducer} from "./appReducer";
import {userDataReducer} from "./userDataReducer";


let rootReducer = combineReducers({
    isAuth: authReducer,
    articles: articlesReducer,
    app: appReducer,
    userData: userDataReducer
})


export type AppStateType = ReturnType<typeof rootReducer>;


export const store = createStore(rootReducer, applyMiddleware(thunk))