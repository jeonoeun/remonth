import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";
import moment from "moment";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCardDetail } from "../../store/card";
import { useEffect } from "react";

export default function ReactCalendar() {
  const [value, onChange] = useState(new Date());
  const [isDateModal, setIsDateModal] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser) || {};
  const matchedCard =
    currentUser && currentUser.cards
      ? currentUser.cards.find(
          (card) => card.date === moment(value).format("YYYY-MM-DD")
        )
      : null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setCardDetail({
        date: moment(value).format("YYYY-MM-DD"),
      })
    );
  }, [value, dispatch]);

  const handleClick = () => {
    setIsDateModal(true);
  };

  return (
    <div className="calendar">
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={handleClick}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        next2Label={null}
        prev2Label={null}
        tileContent={({ date, view }) => {
          const momentCard =
            currentUser && currentUser.cards
              ? currentUser.cards.find(
                  (card) => card.date === moment(date).format("YYYY-MM-DD")
                )
              : null;

          if (momentCard) {
            return (
              <div className="dot">
                <img src={momentCard.image} alt="" />
              </div>
            );
          }
        }}
      />
      {isDateModal && (
        <div className="date-modal">
          <div className="modal">
            <div className="date-title">
              {moment(value).format("YYYY년 MM월 DD일")}
            </div>
            {matchedCard ? (
              <ul>
                <li
                  className="flex"
                  onClick={() => navigate(`/${matchedCard.id}`)}
                >
                  <div className="color-box"></div>
                  <p>{matchedCard.title}</p>
                </li>
              </ul>
            ) : (
              <p>이날의 기록이 없습니다</p>
            )}
            <button
              className="category-btn flex"
              onClick={() => navigate("/builder")}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
