import React from "react";
import "./LoginModal.scss";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ setShowLoginModal }) {
  const navigate = useNavigate();
  return (
    <div className="login-modal" onClick={() => setShowLoginModal(false)}>
      <div className="inner" onClick={(e) => e.stopPropagation()}>
        <p>
          로그인이 필요해요. <br /> 로그인 페이지로 이동하시겠어요?
        </p>
        <div className="flex">
          <button onClick={() => setShowLoginModal(false)}>취소</button>
          <button className="login-btn" onClick={() => navigate("/login")}>
            이동하기
          </button>
        </div>
      </div>
    </div>
  );
}
