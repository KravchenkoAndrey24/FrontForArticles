
export type RequestStatusType = 'loading' | 'succeeded'

const initialState = {
    status: 'succeeded' as RequestStatusType
}

type InitialStateType = typeof initialState
export type AppReducerActionType = ReturnType<typeof setAppStatusAC>

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status };
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return { type: 'APP/SET-STATUS', status } as const
}