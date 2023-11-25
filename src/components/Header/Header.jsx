import React from "react";
import "./Header.scss";
import logo from "../../images/logo.png";
import { login } from "../../api/firebase";
import { Link, useLocation } from "react-router-dom";

export default function Header({ currentUser }) {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="hd-wrapper flex">
        <div className="one flex">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <ul className="flex">
            <li>
              <Link to="/moment">모먼트</Link>
            </li>
            <li>
              <Link to="/moment">검색</Link>
            </li>
            <li>
              <Link to="/remonth">월간지</Link>
            </li>
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <Link to="/builder/moment">등록하기</Link>
            </li>
          </ul>
        </div>
        <div className="two">
          {currentUser ? (
            <div className="hd-user">
              <Link to="/mypage" className="flex">
                <img src={currentUser.image} alt="" />
                <p>
                  <strong>{currentUser.name} </strong>님
                </p>
              </Link>
            </div>
          ) : (
            <button onClick={login} className="login-btn">
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
