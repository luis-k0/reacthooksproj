import React, { useContext } from "react";

import AuthContext from "../auth-context";

const header = props => {
  const auth = useContext(AuthContext);

  return (
    <header>
      <button onClick={props.onLoadTodos} disabled={!auth.status}>
        Todo List
      </button>{" "}
      |<button onClick={props.onLoadAuth}>Auth</button>
    </header>
  );
};

export default header;
