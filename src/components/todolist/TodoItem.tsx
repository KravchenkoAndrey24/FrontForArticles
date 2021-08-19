import React, {useState} from 'react'
import {deleteArticleTC, TodolistType, updateTodoItemTC} from "../../redux/todolistReducer";
import {useDispatch} from "react-redux";
import { ChangeEvent } from 'react';

type TodoItemType = {
    todoItem: TodolistType
    hideCompletedTodoItems: boolean
}

export const TodoItem = (props: TodoItemType) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState<string>(props.todoItem.title)
    const [complete, setComplete] = useState<boolean>(props.todoItem.complete)


    const changeCompleteValue = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTodoItemTC(props.todoItem.id, e.currentTarget.checked, title))
        setComplete(e.currentTarget.checked)
    }
    const setTitleValue = () => {
        if(!title){
            dispatch(deleteArticleTC(props.todoItem.id))
        }
        dispatch(updateTodoItemTC(props.todoItem.id, complete,  title))
    }


        return (
            <tr className={`
                ${ props.todoItem.complete && props.hideCompletedTodoItems ? `d-none` : "" } 
                ${!props.todoItem.complete ? "table-light" : ""}`}
            >
                <td style={{borderBottom: '0px'}}>
                    <svg
                        className={`bi bi-check-circle ${ props.todoItem.complete ?  `text-success` : `text-muted`}`}
                        width="2em"
                        height="2em"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
                            clipRule="evenodd"
                        />
                        <path
                            fillRule="evenodd"
                            d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </td>
                <td style={{borderBottom: '0px'}}>
                    <input
                        onBlur={setTitleValue}
                        value={title}
                        onChange={(e)=>setTitle(e.currentTarget.value)}
                        type="text"
                        className="form-control"
                    />
                </td >
                <td className="text-right" style={{borderBottom: '0px'}}>
                    <div className="form-check form-check-inline">
                        <input
                            defaultChecked={complete}
                            type="checkbox"
                            className="form-check-input"
                            id={`complete-${props.todoItem.id}`}
                            onChange={changeCompleteValue}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`complete-${props.todoItem.id}`}
                        >
                            Complete?
                        </label>
                    </div>
                    <button onClick={()=>dispatch(deleteArticleTC(props.todoItem.id))} className="btn btn-outline-danger">Delete</button>
                </td>
            </tr>
        )
    }


