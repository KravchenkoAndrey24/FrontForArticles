import React from 'react';
import isAuthReducer, {setIsAuth, setIsRedirect} from "../redux/isAuthReducer";

let initialState: any = {
};

beforeEach(()=>{
    initialState = {
        isAuth: false,
        isRedirect: false
    }
})

test('should be isAuth true', () => {
    const newState = isAuthReducer(initialState, setIsAuth(true))
    expect(newState.isAuth).toBe(true)
});
test('should be isAuth false', () => {
    const newState = isAuthReducer(initialState, setIsAuth(false))
    expect(newState.isAuth).toBe(false)
});
test('should be isRedirect true', () => {
    const newState = isAuthReducer(initialState, setIsRedirect(true))
    expect(newState.isRedirect).toBe(true)
});
test('should be isRedirect false', () => {
    const newState = isAuthReducer(initialState, setIsRedirect(false))
    expect(newState.isRedirect).toBe(false)
});