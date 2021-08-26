

export enum ACTION_TYPES {
    IS_AUTH = "IS_AUTH",
    IS_REDIRECT = 'IS_REDIRECT '
}

export type ProfileActionsType = ReturnType<typeof setIsAuth> | ReturnType<typeof setIsRedirect>

const initialState = {
    isAuth: false,
    isRedirect: false
};

type initialStateType = typeof initialState;

const authReducer = (state: initialStateType = initialState, action: ProfileActionsType): initialStateType => {
    switch (action.type) {
        case ACTION_TYPES.IS_AUTH:
            return {
                ...state, isAuth: action.isAuth
            };
        case ACTION_TYPES.IS_REDIRECT:
            return {
                ...state, isRedirect: action.isRedirect
            };
        default:
            return state
    }
}

export const setIsAuth = (isAuth: boolean) => ({ type: ACTION_TYPES.IS_AUTH, isAuth } as const)
export const setIsRedirect = (isRedirect: boolean) => ({ type: ACTION_TYPES.IS_REDIRECT, isRedirect } as const)



export default authReducer;
