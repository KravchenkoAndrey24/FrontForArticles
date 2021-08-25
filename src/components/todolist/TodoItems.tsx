import React from 'react'


const TodoItems = (props: any) => {

    return (
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
                    <tbody>{props.children}</tbody>
                </table>
            </div>
        </>
    )
}
export default TodoItems