import React from 'react';
import './TodoList.scss';
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onRemove, onToggle } : { todos : any, onRemove : any, onToggle : any }) => {
    return (
        <div className="TodoList">
            {todos.map((todo : any) => (
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default TodoList;