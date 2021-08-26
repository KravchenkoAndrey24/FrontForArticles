
export type RequestStatusType = 'loading' | 'succeeded'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: ''
}

export type InitialAppStateType = typeof initialState
export type AppReducerActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setErrorsAC>

export const appReducer = (state: InitialAppStateType = initialState, action: AppReducerActionType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status };
        case 'APP/SET-ERRORS':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setErrorsAC = (error: string) => ({ type: 'APP/SET-ERRORS', error } as const)
