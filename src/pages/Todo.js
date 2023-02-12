import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import TodoItem from "../components/TodoItem";

const Todo = () => {
  const access_token = "Bearer " + localStorage.getItem("access_token");
  const { onCreate, onInit } = useContext(DiaryDispatchContext);
  const checkList = useContext(DiaryStateContext);
  // const [data, setData] = useState([]);

  const contentInput = useRef();

  const [state, setState] = useState({
    content: "",
    id: "",
    check: "",
  });

  const todoList = async () => {
    const res = await axios
      .get("/todos", {
        headers: { Authorization: access_token },
      })
      .then((res) => Array.from(res.data));
    const todoList = res.map((it) => {
      return {
        id: it.id,
        content: it.todo,
        check: it.isCompleted,
        userId: it.userId,
      };
    });
    console.log(todoList);
    onInit(todoList);
  };

  useEffect(() => {
    todoList();
  }, []);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios
      .post(
        "/todos",
        {
          //data
          todo: state.content,
        },
        {
          headers: { Authorization: access_token },
        }
      )
      .then((res) => {
        console.log(res.data);
        onCreate(res.data.todo, res.data.id, res.data.isCompleted);
        alert("저장 성공");
        setState({
          content: "",
          id: "",
          check: "",
        });

        // const initData = () => {
        //   return {
        //     id: res.data.id,
        //     content: res.data.todo,
        //     isChecked: res.data.isCompleted,
        //     userId: res.data.userId,
        //   };
        // };
        // setData(initData);
      });
  };

  return (
    <div className="Todo">
      <input className="Todo_input"
        data-testid="new-todo-input"
        ref={contentInput}
        type="text"
        name="content"
        placeholder="할일을 작성해주세요."
        value={state.content}
        onChange={handleChangeState}
      />
      <button className="Todo_button" data-testid="new-todo-add-button" onClick={handleSubmit}>
        추가
      </button>
      <div>
        <div>
          {checkList.map((it) => (
            <TodoItem key={it.id} {...it} />
          ))}
        </div>
      </div>
    </div>
  );
};

Todo.defaultProps = {
  // undefined에 대한 기본값을 설정
  checkList: [],
};

export default Todo;
