import axios from "axios";
import { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "../App";

const TodoItem = ({ content, id, check }) => {
  const access_token = "Bearer " + localStorage.getItem("access_token");
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const [checkedItems, setCheckedItems] = useState(new Set());

  const [isChecked, setChecked] = useState(check);
  const isCheckedInput = useRef();

  const isId = { id };

  const checkHandler = ({ target }) => {
    setChecked(!isChecked);
    console.log(!isChecked);
    checkedItemHandler(id, target.checked);
  };

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  const handleEdit = () => {
    if (window.confirm(`${id}번 째 리스트를 수정하시겠습니까?`)) {
      axios
        .put(
          `/todos/${id}`,
          {
            todo: localContent,
            isCompleted: isChecked,
          },
          {
            headers: { Authorization: access_token },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      onEdit(id, localContent, isChecked);
      toggleIsEdit();
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
    setChecked(check);
  };

  const handleRemove = () => {
    if (window.confirm(`${id}번 째 리스트를 삭제하시겠습니까?`)) {
      axios
        .delete(`/todos/${id}`, {
          headers: { Authorization: access_token },
        })
        .then((res) => {
          console.log(res.data);
        });
      onRemove(id);
    }
  };

  return (
    <div className="TodoItem" value={isId}>
      <li className="TodoItem_li">
        <label className="TodoItem_label">
          <input
            type="checkbox"
            ref={isCheckedInput}
            value={isChecked}
            checked={isChecked}
            onChange={(e) => checkHandler(e)}
          />
          <span className="TodoItem_span">
            {isEdit ? (
              <>
                <input className="TodoItem_input"
                  data-testid="modify-input"
                  type="text"
                  ref={localContentInput}
                  value={localContent}
                  onChange={(e) => setLocalContent(e.target.value)}
                />
              </>
            ) : (
              <>{content}</>
            )}
          </span>
        </label>
        {isEdit ? (
          <>
            <button data-testid="submit-button" className="TodoItem_button" onClick={handleEdit}>
              제출
            </button>
            <button data-testid="cancel-button" className="TodoItem_button" onClick={handleQuitEdit}>
              취소
            </button>
          </>
        ) : (
          <>
            <button data-testid="modify-button" className="TodoItem_button" onClick={toggleIsEdit}>
              수정
            </button>
            <button data-testid="delete-button" className="TodoItem_button" onClick={handleRemove}>
              삭제
            </button>
          </>
        )}
      </li>
    </div>
  );
};

export default TodoItem;
