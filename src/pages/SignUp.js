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

  useEffect(() => {
    setDisabled(!(isEmail && isPassword));
  }, [isEmail, isPassword]);

  // const trysignup = (e) => {
  //   axios({
  //     method: "post",
  //     url: "/auth/signup",
  //     data: {
  //       email: "state.email",
  //       password: "state.password",
  //     },
  //   });
  //   navigate("/signin");
  // };

  const trysignup = () => {
    axios
      .post("/auth/signup", {
        email: state.email,
        password: state.password,
      })
      .then((response) => {
          console.log(response.data);
          if (localStorage.getItem("access_token") != null) {
            navigate("/todo");
          } else {
            navigate("/signin");
          }
      });
  };

  return (
    <div className="SignUp">
      <input className="SignUp_input"
        data-testid="email-input"
        placeholder="email"
        name="email"
        type="text"
        value={state.email}
        onChange={onChangeEmail}
      />
      <input className="SignUp_input"
        data-testid="password-input"
        placeholder="password"
        name="password"
        type="text"
        value={state.password}
        onChange={onChangePassword}
      />
      <button className="SignUp_button"
        data-testid="signup-button"
        disabled={disabled}
        onClick={trysignup}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignIn;
