import React from 'react'
import { Droppable } from 'react-beautiful-dnd'


const TodoItems = (props: any) => {

    return (
        <Droppable droppableId={'1'}>
        {(provider) => (
            <>
                <hr />
                <button
                    className="btn btn-outline-primary btn-block mb-3"
                    onClick={()=>props.toggleCompletedTodoItems()}
                >
                    {props.hideCompletedTodoItems
                        ? `Show Completed Items`
                        : `Hide Completed Items `}
                </button>
                <div className="table-responsive">
                    <table className="table table-hover ">
                        <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Item</th>
                            <th scope="col" className="text-right">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody ref={provider.innerRef} {...provider.droppableProps}>{props.children}</tbody>
                    </table>
                </div>
                {provider.placeholder}
            </>
            )}
        </Droppable>
    )
}
export default TodoItems