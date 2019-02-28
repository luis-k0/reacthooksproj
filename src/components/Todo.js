import React, { useState, useEffect, useReducer, useRef, useMemo } from "react";
import axios from "axios";

import List from "./List";
import { useFormInput } from "../hooks/forms";

const todo = props => {
  // useState returns an array, position 0 is the state, position 1 is the function to update the state
  // const [todoName, setTodoName] = useState(""); // array destructuring // commented to test useRef
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  // const [todoList, setTodoList] = useState([]); // commented to useReducer
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });
  const [inputIsValid, setInputIsValid] = useState(false);
  // const todoInputRef = useRef();
  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

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
        // setTodoList(todos);
        dispatch({ type: "SET", payload: todos });
      });
    // with the return below, the function inside will be executed before the useEffect function
    return () => {
      console.log("axios cleanup");
    };
  }, []);

  // const mouseMoveHandler = event => {
  //   console.log(event.clientX, event.clientY);
  // };

  // useEffect(() => {
  //   document.addEventListener("mousemove", mouseMoveHandler);
  //   // event cleanup, is executed before useEffect function
  //   return () => {
  //     console.log("mousemove cleanup");
  //     document.removeEventListener("mousemove", mouseMoveHandler);
  //   };
  //   // with [] as second argument, the useEffect function will be executed as componentDidMount event
  //   // with [] as second argument, the return function will be executed as componentDidUnmout event
  // }, []);

  // useEffect(() => {
  //   if (submittedTodo) {
  //     // only if isn't the first time render
  //     // setTodoList(todoList.concat(submittedTodo));
  //     dispatch({ type: "ADD", payload: submittedTodo });
  //   }
  //   // runs only if submittedTodo changes
  // }, [submittedTodo]);

  // commented do test useRef
  // const inputChangeHandler = event => {
  //   // console.log(todoName);
  //   setTodoName(event.target.value); // with separated useState
  //   // setTodoState({
  //   //   userInput: event.target.value,
  //   //   todoList: todoState.todoList
  //   // });
  // };

  const todoAddHandler = () => {
    // setTodoList(todoList.concat(todoName)); // concat returns a new array // with saparated useState
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });

    // todoInputRef created with useRef
    // current have the referento html element
    const todoName = todoInput.value; // const todoName = todoInputRef.current.value;

    axios
      .post("https://reacthooks-aec8d.firebaseio.com/todos.json", {
        name: todoName
      })
      .then(res => {
        // setTimeout only to simulate response delay from server
        setTimeout(() => {
          // console.log(res);
          const todoItem = { id: res.data.name, name: todoName };
          // setTodoList(todoList.concat(todoItem)); // changed by setSubmittedTodo below
          // setSubmittedTodo(todoItem); // changed by the dispatch below
          // dispatch always have the latest state, then we don't have the problem of synchronism like setTodoList
          dispatch({ type: "ADD", payload: todoItem });
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(
        "https://reacthooks-aec8d.firebaseio.com/todos/" + todoId + ".json"
      )
      // .delete(`https://reacthooks-aec8d.firebaseio.com/todos/${todoId}.json`)
      // .delete(`https://reacthooks-aec8d.firebaseio.com/todos.json`, todoId) // delete all todos, not working
      .then(res => {
        console.log(todoId);
        dispatch({ type: "REMOVE", payload: todoId });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const inputValidationHandler = event => {
    if (event.target.value.trim() === "") {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        // onChange={inputChangeHandler}
        // value={todoName} //value={todoState.userInput} //
        // ref={todoInputRef}
        onChange={todoInput.onChange} // onChange={inputValidationHandler}
        value={todoInput.value}
        style={{ backgroundColor: todoInput.validity ? "transparent" : "red" }} //style={{ backgroundColor: inputIsValid ? "transparent" : "red" }}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      {/* useMemo verifies if array changes to render the component */}
      {useMemo(
        () => (
          <List items={todoList} onClick={todoRemoveHandler} />
        ),
        [todoList]
      )}
    </React.Fragment>
  );
};

export default todo;
