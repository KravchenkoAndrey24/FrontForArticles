import {Dispatch} from "redux";
import {setAppStatusAC, setErrorsAC} from "./appReducer";
import {todolistApi} from "../api/API";
import {setIsAuth, setIsRedirect} from "./isAuthReducer";

export enum ACTION_TYPES {
    SET_TODOLIST = "SET_TODOLIST",
    ADD_TODO_ITEM = "ADD_TODO_ITEM",
    DELETE_TODO_ITEM = 'DELETE_TODO_ITEM',
    UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM'
}

export type TodolistActionsType = ReturnType<typeof setTodolistAC>
    | ReturnType<typeof addTodoItemAC>
    | ReturnType<typeof deleteTodoItemAC>
    | ReturnType<typeof updateTodoItemAC>

export type TodolistType = {
    id: number
    title: string
    complete: boolean
}

let initialState: TodolistType[] = []

type initialStateType = typeof initialState;

export const todolistReducer = (state: initialStateType = initialState, action: TodolistActionsType): initialStateType => {
    switch (action.type) {
        case ACTION_TYPES.SET_TODOLIST:
            return action.todolistData;
        case ACTION_TYPES.ADD_TODO_ITEM:
            return [action.todoItemBody, ...state]
        case ACTION_TYPES.DELETE_TODO_ITEM:
            return state.filter(item => item.id !== action.todoItemId)
        case ACTION_TYPES.UPDATE_TODO_ITEM:
            return state.filter(item => {
                if (item.id === action.todoItemId) {
                    item.title = action.editTitle
                    item.complete = action.editComplete
                    return {...item}
                }
                return item
            })
        default:
            return state
    }
}

export const setTodolistAC = (todolistData: TodolistType[]) => ({ type: ACTION_TYPES.SET_TODOLIST, todolistData } as const)
export const addTodoItemAC = (todoItemBody: TodolistType) => ({ type: ACTION_TYPES.ADD_TODO_ITEM, todoItemBody } as const)
export const deleteTodoItemAC = (todoItemId: number) => ({ type: ACTION_TYPES.DELETE_TODO_ITEM, todoItemId } as const)
export const updateTodoItemAC = (todoItemId: number, editComplete: boolean, editTitle: string) => ({ type: ACTION_TYPES.UPDATE_TODO_ITEM, todoItemId, editComplete, editTitle } as const)



export const setTodolistTC = () => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolist().then(res => {
        dispatch(setTodolistAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
    }).catch( err => {
        dispatch(setErrorsAC(err?.response?.data?.errors[0]))
        dispatch(setIsAuth(false))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
        }
    )
}

export const addTodoItemTC = (todoItemBody: todoItemBodyType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.addTodoItem(todoItemBody).then(res => {
        dispatch(addTodoItemAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
    }).catch( err => {
        dispatch(setErrorsAC(err?.response?.data?.errors[0]))
        dispatch(setIsAuth(false))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
        }
    )
}

export const deleteArticleTC = (todoItemId: number) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.deleteTodoItem(todoItemId).then(res => {
        dispatch(deleteTodoItemAC(todoItemId))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
    }).catch(err => {
        dispatch(setErrorsAC(err?.response?.data?.errors[0]))
        dispatch(setIsAuth(false))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
        }
    )
}

export const updateTodoItemTC = (todoItemId: number, editComplete: boolean, editTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodoItem(todoItemId, editComplete, editTitle).then(res => {
        dispatch(updateTodoItemAC(todoItemId, editComplete, editTitle))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
    }).catch(err => {
        if(err.response.data.errors){
            dispatch(setErrorsAC(err.response.data.errors[0]))
        }
        dispatch(setIsAuth(false))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
    })
}



export type todoItemBodyType = {
    title: string
    complete: boolean
}