import React from 'react';
import {
    addTodoItemAC,
    deleteTodoItemAC,
    todolistReducer,
    TodolistType, updateIndexTodoItemAC,
    updateTodoItemAC
} from "../redux/todolistReducer";

let initialState: TodolistType[] = []

beforeEach(()=>{
    initialState = [
        {
            id: 1,
            title: 'Test reducer first',
            complete: false
        },
        {
            id: 2,
            title: 'Test reducer second',
            complete: false
        }
    ]
})

test('should be added todo item', () => {
    const newState = todolistReducer(initialState, addTodoItemAC({id: 3, title: 'added todo item', complete: false}))
    expect(newState.length).toBe(3)
    expect(newState[0].id).toBe(3)
    expect(newState[0].title).toBe('added todo item')
});

test('should be deleted todo item', ()=>{
    const newState = todolistReducer(initialState, deleteTodoItemAC(2))
    expect(newState.length).toBe(1)
    expect(newState[0].id).toBe(1)
})
test('should be updated todo item', ()=>{
    const newState = todolistReducer(initialState, updateTodoItemAC(1, true,'changed title'))
    expect(newState.length).toBe(2)
    expect(newState[0].complete).toBe(true)
    expect(newState[0].title).toBe('changed title')
})
test('should be updated index todo item', ()=>{
    const newState = todolistReducer(initialState, updateIndexTodoItemAC(
         {
            droppableId: "1",
            index: 1
        },
        1,
        {
            droppableId: "1",
            index: 0
        }
    ))
    expect(newState.length).toBe(2)
    expect(newState[0].id).toBe(2)
    expect(newState[0].title).toBe('Test reducer second')
    expect(newState[1].id).toBe(1)
    expect(newState[1].title).toBe('Test reducer first')
})