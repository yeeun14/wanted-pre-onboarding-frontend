import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleChangeSignin = () => {
    if (localStorage.getItem("access_token") != null) {
      navigate("/todo");
    } else {
      navigate("/signin");
    }
  };

  const handleChangeSignup = () => {
    if (localStorage.getItem("access_token") != null) {
      navigate("/todo");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="Home">
      <button className="Home_button" onClick={handleChangeSignin}>로그인</button>
      <button className="Home_button" onClick={handleChangeSignup}>회원가입</button>
    </div>
  );
};

export default Home;
