import React, { useEffect, useState } from "react";
import "./Remonth.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getRemonthList } from "../../api/firebase";
import { setRemonths } from "../../store/moment";
import { setUserRemonths } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

export default function Remonth() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser) || {};
  const remonthData = useSelector((state) => state.moments.remonths);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [date, setDate] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRemonthList();
        dispatch(setRemonths(data));
        currentUser.id &&
          dispatch(
            setUserRemonths(
              data.filter((card) => card.userId === currentUser.id)
            )
          );
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [dispatch, currentUser.id]);

  return (
    <div className="remonth">
      <div className="title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
        <p className="page-name">월간지</p>
      </div>
      <div className="content">
        <div className="block-title flex">
          <div>
            <span>전체</span>
            <span className="color-num">{remonthData.length}</span>
          </div>
          <button className="filter-btn flex" onClick={() => setIsModal(true)}>
            <BiSliderAlt />
          </button>
        </div>
        {isModal && (
          <ul className="filter-box">
            <li className="list flex">
              <div className="list-name">기간</div>
              <div className="flex">
                <input type="month" />
                <input type="month" />
              </div>
            </li>
            <li className="list ft flex">
              <button className="clear flex">
                <GrPowerReset />
                <span>초기화</span>
              </button>
              <button className="close" onClick={() => setIsModal(false)}>
                {remonthData.length}개 표시
              </button>
            </li>
          </ul>
        )}
        <div className="selected-ct">
          <ul className="flex">
            {date &&
              date.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    const deleted = date.filter((e) => !(e === item));
                    setDate(deleted);
                  }}
                  className="flex"
                >
                  <span>{item}</span>
                  <span className="close-icon flex">
                    <AiOutlineClose />
                  </span>
                </li>
              ))}
          </ul>
        </div>
        {remonthData.map((card) => (
          <div
            key={card.id}
            className="remonth-card"
            onClick={() => navigate(`/remonth/${card.id}`)}
          >
            <div className="img-ct flex">
              {card.selectedCards
                .filter((_, i) => i < 4)
                .map((e) => (
                  <div className="image">
                    <img src={e.image} alt="" />
                  </div>
                ))}
              <div className="filter"></div>
              <div className="user flex">
                <div className="flex">
                  <img src={card.userImage} alt="" className="user-img" />
                  <p>{card.userName}</p>
                </div>
                <span className="card-num">+ {card.selectedCards.length}</span>
              </div>
            </div>
            <div className="card-info">
              <p className="card-title">
                {card.month.slice(-2)}월호 | {card.title}
              </p>
              <p className="card-review">{card.review}</p>
              <div className="like-box">
                <span>좋아요 0</span>
                <span>댓글 0</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MobileNavbar />
      {/* {isModal && (
        <div className="modal flex">
          <div className="modal-hd flex">
            <button
              className="close-btn flex"
              onClick={() => setIsModal(false)}
            >
              <AiOutlineClose />
            </button>
            <span className="hd-title">필터</span>
          </div>
          <div className="modal-inner">
            <div className="date-filter">
              <p className="filter-title">기간 설정</p>
              <input type="month" />
              <input
                type="month"
                onChange={(e) => {
                  setDate();
                }}
              />
            </div>
          </div>
          <div className="modal-ft flex">
            <button className="clear flex">
              <GrPowerReset />
              <span>초기화</span>
            </button>
            <button className="close">4개 표시</button>
          </div>
        </div>
      )} */}
    </div>
  );
}
