import React, { useEffect, useState } from "react";
import "./Header.scss";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { login, logout, onUserChanged } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setCurrentUser } from "../../store/user";
import logo from "../../images/logo.svg";
import { useNavigate } from "react-router-dom";

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
        <div className="user flex">
          <img src={currentUser.image} alt="" />
          <IoIosArrowDown />
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
