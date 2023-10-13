import React, { useEffect } from "react";
import "./Header.scss";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { login, logout, onUserChanged } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setCurrentUser } from "../../store/user";

export default function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    onUserChanged((userAuth) => {
      userAuth &&
        dispatch(
          addUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
          })
        );
      userAuth &&
        dispatch(
          setCurrentUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
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
        {currentUser ? (
          <div className="profile flex">
            <img src={currentUser.image} alt="" className="user-img" />
            <IoIosArrowDown />
          </div>
        ) : (
          <button onClick={login}>login</button>
        )}
        <button onClick={handleLogout}>logout</button>
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
