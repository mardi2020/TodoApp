import React from 'react';
import './TodoTemplate.css';

const TodoTemplate = ({ children } : {children : any}) => {
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정 관리</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default TodoTemplate;