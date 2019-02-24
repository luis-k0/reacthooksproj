import React, { useState, useEffect } from "react";
import axios from "axios";

const todo = props => {
  // useState returns an array, position 0 is the state, position 1 is the function to update the state
  const [todoName, setTodoName] = useState(""); // array destructuring
  const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });

  // useEffect runs after each render cycle
  useEffect(() => {
    axios
      .get("https://reacthooks-aec8d.firebaseio.com/todos.json")
      .then(result => {
        console.log(result);
        const todoData = result.data;
        const todos = [];
        for (const key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        setTodoList(todos);
      });
  }, []);

  const inputChangeHandler = event => {
    // console.log(todoName);
    setTodoName(event.target.value); // with separated useState
    // setTodoState({
    //   userInput: event.target.value,
    //   todoList: todoState.todoList
    // });
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName)); // concat returns a new array // with saparated useState
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });
    axios
      .post("https://reacthooks-aec8d.firebaseio.com/todos.json", {
        name: todoName
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName} //value={todoState.userInput} //
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {/* {todoState.todoList.map(todo => ( */}
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default todo;
