import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "./isAuthReducer";
import { todolistReducer } from "./todolistReducer";
import {appReducer} from "./appReducer";
import {userDataReducer} from "./userDataReducer";


let rootReducer = combineReducers({
    isAuth: authReducer,
    todolist: todolistReducer,
    app: appReducer,
    userData: userDataReducer
})


export type AppStateType = ReturnType<typeof rootReducer>;


export const store = createStore(rootReducer, applyMiddleware(thunk))