import React from "react";

const list = props => {
  console.log("Rendering the list..");
  return (
    <ul>
      {/* {todoState.todoList.map(todo => ( */}
      {props.items.map(item => (
        // <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
        <li key={item.id} onClick={() => props.onClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default list;
