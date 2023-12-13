import React, { useEffect } from "react";
import "./Header.scss";
import logo from "../../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser, setCurrentUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import { onUserChanged, setUser } from "../../api/firebase";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    onUserChanged((userAuth) => {
      userAuth &&
        dispatch(
          setCurrentUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
            email: userAuth.email,
          })
        );
      userAuth && setUser(userAuth.uid);
    });
  }, [dispatch]);

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
              <Link to="/search">검색</Link>
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
            <button onClick={() => navigate("/login")} className="login-btn">
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
