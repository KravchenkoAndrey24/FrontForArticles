import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {addTodoItemTC} from "../../redux/todolistReducer";
import {AppStateType} from "../../redux/reduxStore";


export const TodoForm = () => {

    const dispatch = useDispatch();
    const user_id = useSelector<AppStateType, number>(state=>state.userData.id)
    const [itemTitle, setItemTitle] = useState<string>('')


    const createNewTodoItem = () => {
        dispatch(addTodoItemTC({title:itemTitle, complete: false, user_id}))
        setItemTitle('')
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
                            className="form-control"
                            id="title"
                            placeholder="Write your todo item here..."
                            value={itemTitle}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <button onClick={createNewTodoItem} className="btn btn-outline-success btn-block">
                            Add To Do Item
                        </button>
                    </div>
                </div>
            </div>
     )
}

