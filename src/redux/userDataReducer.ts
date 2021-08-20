import {authAPI, RegistrationDataType} from "../api/API";
import {Dispatch} from "redux";
import {setAppStatusAC, setErrorsAC} from "./appReducer";
import {setIsAuth, setIsRedirect} from "./isAuthReducer";


export enum ACTION_TYPES {
    SET_DATA = "SET_DATA"
}

export type ProfileActionsType = ReturnType<typeof setUserData>

let initialState = {
    id: 0,
    email: '',
    name: ''
};

type initialStateType = typeof initialState;

export const userDataReducer = (state: initialStateType = initialState, action: ProfileActionsType): initialStateType => {
    switch (action.type) {
        case ACTION_TYPES.SET_DATA:
            return { ...action.dataUser};
        default:
            return state
    }
}

export const setUserData = (dataUser: initialStateType) => ({ type: ACTION_TYPES.SET_DATA, dataUser } as const)

export const registrationTC = (data: RegistrationDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.registration(data).then(res => {
        dispatch(setUserData(res))
        dispatch(setIsAuth(true))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
    }).catch((error) => {
        dispatch(setErrorsAC(error?.response?.data?.errors?.full_messages[0]))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRedirect(true))
    })
}

export const loginTC = (data: RegistrationDataType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setUserData(res))
            dispatch(setIsAuth(true))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsRedirect(true))
        })
        .catch((error) => {
            console.log(error)

            dispatch(setErrorsAC(error?.response?.data?.errors[0]))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsAuth(false))
            dispatch(setIsRedirect(true))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            dispatch(setIsRedirect(true))
            dispatch(setIsAuth(false))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsRedirect(true))
        })
}

