import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useCallback, useReducer } from "react";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId
          ? { ...it, content: action.newContent, checked: action.newChecked }
          : it
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const onInit = useCallback((todoList) => {
    dispatch({
      type: "INIT",
      data: todoList,
    });
  }, []);

  const onCreate = useCallback((content, id, check) => {
    dispatch({
      type: "CREATE",
      data: { content, id, check },
    });
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent, newChecked) => {
    dispatch({ type: "EDIT", targetId, newContent, newChecked });
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{ onInit, onCreate, onEdit, onRemove }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/todo" element={<Todo />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
