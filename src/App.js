import React, { useState } from "react";

import Todo from "./components/Todo";
import Header from "./components/Header";
import Auth from "./components/Auth";
import AuthContext from "./auth-context";

const app = props => {
  const [pageName, setPageName] = useState("auth");
  const [authStatus, setAuthStatus] = useState(false);

  const swichtPage = page => {
    setPageName(page);
  };

  const login = () => {
    setAuthStatus(true);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: login }}>
        <Header
          onLoadTodos={() => swichtPage("todo")}
          onLoadAuth={() => swichtPage("auth")}
        />
        <hr />
        {pageName === "todo" ? <Todo /> : <Auth />}
      </AuthContext.Provider>
    </div>
  );
};

export default app;
