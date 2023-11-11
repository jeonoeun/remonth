import React, { useEffect, useState } from "react";
import "./Header.scss";
import { login, onUserChanged } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setCurrentUser } from "../../store/user";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import logo from "../../images/logo.png";

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

  return (
    <header className="header">
      <div className="hd-wrapper flex">
        {currentUser ? (
          <button
            className="add-button flex"
            onClick={() => navigate("/builder/moment")}
          >
            <AiOutlinePlus />
          </button>
        ) : (
          <button onClick={login}>로그인</button>
        )}
      </div>
    </header>
  );
}
