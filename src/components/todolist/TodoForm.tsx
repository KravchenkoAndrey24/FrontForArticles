import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addTodoItemTC} from "../../redux/todolistReducer";


export const TodoForm = () => {

    const dispatch = useDispatch();
    const [itemTitle, setItemTitle] = useState<string>('')


    const createNewTodoItem = () => {
        if(itemTitle){
            dispatch(addTodoItemTC({title: itemTitle, complete: false}))
            setItemTitle('')
        }
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === 'Enter'){
            createNewTodoItem()
        }
    }

     return (
            <div className="my-3">
                <div className="form-row">
                    <div className="form-group col-md-8" style={{display: "block"}}>
                        <input
                            onChange={(e)=>setItemTitle(e.currentTarget.value)}
                            type="text"
                            name="title"
                            required
                            onKeyPress={onKeyPressHandler}
                            className="form-control"
                            id="title"
                            placeholder="Write your todo item here..."
                            value={itemTitle}
                        />
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

