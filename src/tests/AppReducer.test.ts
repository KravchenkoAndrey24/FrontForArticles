import React from 'react';
import {appReducer, RequestStatusType, setAppStatusAC, setErrorsAC} from "../redux/appReducer";

let initialState: any = {
}

beforeEach(()=>{
    initialState = {
        status: 'succeeded' as RequestStatusType,
        error: ''
    }
})

test('should be loading status', () => {
    const newState = appReducer(initialState, setAppStatusAC('loading'))
    expect(newState.status).toBe('loading')
    expect(newState.error).toBe('')
});

test('should be succeeded status', () => {
    const newState = appReducer(initialState, setAppStatusAC('succeeded'))
    expect(newState.status).toBe('succeeded')
    expect(newState.error).toBe('')
});
test('should be something error', () => {
    const newState = appReducer(initialState, setErrorsAC('Error 401'))
    expect(newState.status).toBe('succeeded')
    expect(newState.error).toBe('Error 401')
});
test('should be without error', () => {
    let newState = appReducer(initialState, setErrorsAC('Error 401'))
    expect(newState.status).toBe('succeeded')
    expect(newState.error).toBe('Error 401')
    newState = appReducer(initialState, setErrorsAC(''))
    expect(newState.status).toBe('succeeded')
    expect(newState.error).toBe('')
});