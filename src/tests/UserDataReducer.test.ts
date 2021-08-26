import React from 'react';
import {setUserData, userDataReducer} from "../redux/userDataReducer";

let initialState: any = {
};

beforeEach(()=>{
    initialState = {
        id: 0,
        email: '',
        name: ''
    }
})

test('should be set user data', () => {
    const newState = userDataReducer(initialState, setUserData({id: 1, email: 'test@email.com', name: 'test name'}))
    expect(newState.id).toBe(1);
    expect(newState.name).toBe('test name');
    expect(newState.email).toBe('test@email.com');
});
