import React, { useEffect } from "react";
import "./Header.scss";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { login, logout, onUserChanged } from "../../api/firebase";
import { setUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    onUserChanged((userAuth) => {
      userAuth &&
        dispatch(
          setUser({
            name: userAuth.displayName,
            image: userAuth.photoURL,
            id: userAuth.uid,
          })
        );
    });
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    dispatch(setUser(null));
  };

  return (
    <header className="header">
      <div className="hd-wrapper flex">
        {user ? (
          <div className="profile flex">
            <img src={user.image} alt="" className="user-img" />
            <IoIosArrowDown />
          </div>
        ) : (
          <button onClick={login}>login</button>
        )}
        {/* <button onClick={handleLogout}>logout</button> */}
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
