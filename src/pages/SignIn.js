import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(state.email, state.password);
  }, [state.email, state.password]);

  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setState({ ...state, email: e.target.value });
    if (e.target.value && e.target.value.match("@")) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  };

  const onChangePassword = (e) => {
    setState({ ...state, password: e.target.value });
    if (e.target.value && e.target.value.length >= 8) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
  };

  // const onChangePassword = (e) => {
  //   if (!e.target.value || e.target.value >= 8) setIsPassword(false);
  //   else setIsPassword(true);
  //   setState.password(e.target.value);
  // };

  // const handleChangeState = (e) => {
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });

  //   if (state.email.match("@")) {
  //     console.log("이메일 true");
  //     setIsEmail(true);
  //   } else {
  //     console.log("이메일 false");
  //     setIsEmail(false);
  //   }

  //   if (state.password.length >= 7) {
  //     console.log("패스워드 true");
  //     setIsPassword(true);
  //   } else {
  //     console.log("패스워드 false");
  //     setIsPassword(false);
  //   }
  // };

  useEffect(() => {
    setDisabled(!(isEmail && isPassword));
  }, [isEmail, isPassword]);

  // const isValidLogin = isEmail && isPassword ? true : false;

  // const trysignin = (e) => {
  //   axios({
  //     method: "post",
  //     url: "/auth/signin",
  //     data: {
  //       email: "state.email",
  //       password: "state.password",
  //     },
  //   }).then((res) => {
  //     localStorage.setItem("access_token", JSON.stringify(res));
  //   });
  //   navigate("/todo");
  // };

  const trysignin = () => {
    axios
      .post("/auth/signin", {
        email: state.email,
        password: state.password,
      })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        alert("성공적으로 로그인 했습니다.");
        console.log(response.data);
          navigate("/todo");       
      });
  };

  // const TodoList = async () => {
  //   const res = await axios
  //     .get("/todos", {
  //       headers: { Authorization: access_token },
  //     })
  //     .then((res) => res.data.json());
  //   console.log(res.data);
  //   console.log(res.data.length);
  //   const initData = res.slice(0, res.data.length).map((it) => {
  //     return {
  //       id: it.id,
  //       content: it.todo,
  //       isChecked: it.isCompleted,
  //       userId: it.userId,
  //     };
  //   });
  //   onInit(initData);
  // };

  // useEffect(() => {
  //   TodoList();
  // }, []);

  return (
    <div className="SignIn">
      <input className="SignIn_input"
        data-testid="email-input"
        placeholder="email"
        name="email"
        type="text"
        value={state.email}
        onChange={onChangeEmail}
      />
      {/* <span>{emailMessage}</span> */}
      <input className="SignIn_input"
        data-testid="password-input"
        placeholder="password"
        name="password"
        type="text"
        value={state.password}
        onChange={onChangePassword}
      />
      {/* <span>{passwordMessage}</span> */}
      <button className="SignIn_button"
        data-testid="signup-button"
        disabled={disabled}
        onClick={trysignin}
      >
        로그인
      </button>
    </div>
  );
};

export default SignIn;
