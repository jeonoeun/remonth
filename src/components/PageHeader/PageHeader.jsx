import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import "./PageHeader.scss";
import { useSelector } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";

export default function PageHeader({
  matchedItem,
  isModal,
  setIsModal,
  title,
  handleModal,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="title flex">
      <button
        onClick={() =>
          pathname.includes("/builder") ? navigate("/") : navigate(-1)
        }
      >
        <MdKeyboardArrowLeft />
      </button>
      <p className="page-name">{title}</p>
      {pathname.includes("/moment") &&
        currentUser &&
        currentUser.id &&
        matchedItem &&
        matchedItem.user.id === currentUser.id && (
          <button className="setting-btn" onClick={() => setIsModal(!isModal)}>
            <IoMdSettings />
          </button>
        )}
      {pathname === "/mypage" ? (
        <button className="logout-button" onClick={handleModal}>
          <AiFillSetting />
        </button>
      ) : null}
    </div>
  );
}
