import React from "react";
import "./TodoItem.css";
import Checkbox from "../checkbox/CheckBox";

const TodoItem = (props) => {
  const handleCheckboxChange = () => {
    props.onCheckboxChange(props.todo.id);
  };

  const handleDelete = () => {
    props.onDelete(props.todo.id);
  };

  const handleEdit = () => {
    props.onEdit(props.todo);
  };

  const { title, description, completed } = props.todo;

  return (
    <div className={`todo-item ${completed && "todo-completed"}`}>
      <div className="todo-item-header">
        <div className="title-area">
          <Checkbox checked={completed} onChange={handleCheckboxChange} />
          <h4>{title}</h4>
        </div>
        <div>
          <i className="fa fa-pencil" aria-hidden="true" onClick={handleEdit}></i>
          <i className="fa fa-trash" aria-hidden="true" onClick={handleDelete}></i>
        </div>
      </div>
      <div className="separator"></div>
      <p>{description}</p>
    </div>
  );
};

export default TodoItem;