import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";
import moment from "moment";
import { cards } from "../../data";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ReactCalendar() {
  const [value, onChange] = useState(new Date());
  const [isDateModal, setIsDateModal] = useState(null);
  const matchedCard = cards.find(
    (card) => card.date === moment(value).format("YYYY-MM-DD")
  );
  const navigate = useNavigate();

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
          const card = cards.find(
            (card) => card.date === moment(date).format("YYYY-MM-DD")
          );

          if (card) {
            return (
              <div className="flex justify-center items-center absoluteDiv">
                <div className="dot">
                  <img src={card.image} alt="" />
                </div>
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
                <li className="flex">
                  <div className="color-box"></div>
                  <p>{matchedCard.title}</p>
                </li>
              </ul>
            ) : (
              <p>이날의 기록이 없습니다</p>
            )}
            <button
              className="category-btn flex"
              onClick={() => navigate("/builder/1")}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
