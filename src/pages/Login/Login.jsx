import React from "react";
import "./Login.scss";
import logo from "../../images/logo.png";
import googleIcon from "../../images/google.png";
import githubIcon from "../../images/github.png";
import { login } from "../../api/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      await login(provider);
      navigate("/");
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div className="login-page flex">
      <div className="login-ct flex">
        {/* <img src={logo} alt="" />
        <p>죄송하지만 주소가 바뀌거나 사라진 것 같아요.</p>
        <p>정확한 주소인지 다시 한번 확인해 주세요.</p> */}
        <button className="flex" onClick={() => handleLogin("google")}>
          <img src={googleIcon} alt="" />
          <span>Continue with Google</span>
        </button>
        <button className="flex" onClick={() => handleLogin("github")}>
          <img src={githubIcon} alt="" />
          <span>Continue with Github</span>
        </button>
      </div>
    </div>
  );
}
