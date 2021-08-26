import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {addTodoItemTC} from "../../redux/todolistReducer";
import style from './TodoForm.module.scss'

export const TodoForm = () => {

    const dispatch = useDispatch();
    const [itemTitle, setItemTitle] = useState<string>('')
    const [errorTitle, setErrorTitle] = useState<string>('')
    const createNewTodoItem = () => {
        if(itemTitle.trim() !== ''){
            dispatch(addTodoItemTC({title: itemTitle.trim(), complete: false}))
            setItemTitle('')
        } else {
            setErrorTitle('Enter Valid Title')
            setItemTitle('')
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorTitle('')
        setItemTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter'){
            createNewTodoItem()
        }
        setErrorTitle('')
    }
     return (
            <div className="my-3">
                <div className="form-row">
                    <div className="form-group form-floating  col-md-8" style={{display: "block"}}>
                        <input
                            onChange={onChangeHandler}
                            value={itemTitle}
                            type="text"
                            name="title"
                            required
                            onBlur={()=>setErrorTitle('')}
                            onKeyPress={onKeyPressHandler}
                            className={`form-control ${errorTitle ? 'is-invalid' : ''}`}
                            placeholder={'Create New Todo Item'}
                            id="floatingInput"
                        />
                        <label className={`${errorTitle ? `${style.labelColor}` : ''}`} htmlFor='floatingInput'>{errorTitle ? errorTitle  : 'Create New Todo Item'}</label>
                    </div>
                    <div className="form-group col-md-4 mt-2">
                        <button onClick={createNewTodoItem} className="btn btn-outline-success btn-block">
                            Add To Do Item
                        </button>
                    </div>
                </div>
            </div>
     )
}

