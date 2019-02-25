import React, { useState, useEffect } from "react";
import axios from "axios";

const todo = props => {
  // useState returns an array, position 0 is the state, position 1 is the function to update the state
  const [todoName, setTodoName] = useState(""); // array destructuring
  const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });

  // useEffect runs after each render cycle
  // useEffect second parameter is checked to know if the function would be executed, it's executed only if the array of second parameter changes
  // [] empty string is like execute the function on componentDidMount
  // no second argument, the function will run every render cycle
  // [todoname] in second argument, the function will run every time variable changes
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
        // with the return below, the function inside will be executed before the useEffect function
        return () => {
          console.log("Cleanup");
        };
      });
  }, []);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    // event cleanup, is executed before useEffect function
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
    // with [] as second argument, the useEffect function will be executed as componentDidMount event
    // with [] as second argument, the return function will be executed as componentDidUnmout event
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
