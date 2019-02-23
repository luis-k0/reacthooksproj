import React, { useState } from "react";

const todo = props => {
  // useState returns an array, position 0 is the state, position 1 is the function to update the state
  //   const [todoName, setTodoName] = useState(""); // array destructuring
  //   const [todoList, setTodoList] = useState([]);
  const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });

  const inputChangeHandler = event => {
    // console.log(todoName);
    // setTodoName(event.target.value); // with separated useState
    setTodoState({
      userInput: event.target.value,
      todoList: todoState.todoList
    });
  };

  const todoAddHandler = () => {
    // setTodoList(todoList.concat(todoName)); // concat returns a new array // with saparated useState
    setTodoState({
      userInput: todoState.userInput,
      todoList: todoState.todoList.concat(todoState.userInput)
    });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoState.userInput} // value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {/* {todoList.map(todo => ( */}
        {todoState.todoList.map(todo => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
