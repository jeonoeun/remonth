import React, { useEffect, useState } from "react";
import "./Header.scss";
import { AiFillHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { login, logout, onUserChanged } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setCurrentUser } from "../../store/user";
import { useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLogout,
  MdLogin,
} from "react-icons/md";

export default function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onUserChanged((userAuth) => {
      userAuth &&
        dispatch(
          addUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
            email: userAuth.email,
          })
        );
      userAuth &&
        dispatch(
          setCurrentUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
            email: userAuth.email,
          })
        );
    });
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    dispatch(setCurrentUser(null));
  };

  return (
    <header className="header">
      <div className="hd-wrapper flex">
        <div className="user flex" onClick={() => setIsModal(!isModal)}>
          {currentUser ? (
            <img src={currentUser.image} alt="" />
          ) : (
            <FaUserCircle />
          )}
          {isModal ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          {isModal && (
            <div className="background">
              <ul className="user-modal">
                <li onClick={() => navigate("/mypage")}>
                  <span>마이페이지</span>
                  <span>
                    <AiFillHeart />
                  </span>
                </li>
                {currentUser ? (
                  <li onClick={handleLogout}>
                    <span>로그아웃</span>
                    <span>
                      <MdLogout />
                    </span>
                  </li>
                ) : (
                  <li onClick={login}>
                    <span>로그인</span>
                    <span>
                      <MdLogin />
                    </span>
                  </li>
                )}
                <li className="close" onClick={() => setIsModal(!isModal)}>
                  취소
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="util flex">
          <button>
            <FiSearch />
          </button>
          <button>
            <FaBell />
          </button>
        </div>
      </div>
    </header>
  );
}
