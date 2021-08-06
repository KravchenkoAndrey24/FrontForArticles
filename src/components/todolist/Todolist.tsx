import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {Redirect} from "react-router";
import {PATH} from "../../App";
import style from './Todolist.module.css'
import {TodoForm} from "./TodoForm";
import TodoItems from "./TodoItems";
import { TodoItem } from "./TodoItem";
import {setTodolistTC, TodolistType} from "../../redux/todolistReducer";

export const Todolist = () => {

    const dispatch = useDispatch()
    const currentUserEmail = useSelector<AppStateType, string>(state => state.userData.email)
    const [hideCompletedTodoItems, setHideCompletedTodoItems] = useState(false)
    const isAuth = useSelector<AppStateType, boolean>(state=>state.isAuth.isAuth);
    const state = useSelector<AppStateType, TodolistType[]>(state => state.todolist)

    useEffect(()=>{
        if(isAuth){
            dispatch(setTodolistTC());
        }
    }, [dispatch, isAuth])
    if(!isAuth){
        return <Redirect to={PATH.login} />
    }
    const toggleCompletedTodoItems = () => setHideCompletedTodoItems(prev => !prev)
    return (
        <div className={style.main}>
            <TodoForm />
            <TodoItems toggleCompletedTodoItems={toggleCompletedTodoItems} hideCompletedTodoItems={hideCompletedTodoItems}>
                {state.map(item => {
                    return <TodoItem
                        key={item.id}
                        todoItem={item}
                        hideCompletedTodoItems={hideCompletedTodoItems}
                    />
                })}
            </TodoItems>

        </div>
    )

}



