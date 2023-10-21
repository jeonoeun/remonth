import React, { useEffect, useState } from "react";
import "./Remonth.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useDispatch, useSelector } from "react-redux";
import { getRemonthList } from "../../api/firebase";
import { setRemonths } from "../../store/moment";
import { setUserRemonths } from "../../store/user";
import { useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

export default function Remonth() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser) || {};
  const remonthData = useSelector((state) => state.moments.remonths);
  const [selectedCards, setSelectedCards] = useState(remonthData);
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [isDateModal, setIsDateModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState({ start: "", end: "" });

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

  useEffect(() => {
    if (selectedDate.start && selectedDate.end) {
      const filteredDateCards = remonthData.filter((card) => {
        return (
          card.month >= selectedDate.start && card.month <= selectedDate.end
        );
      });
      setSelectedCards(filteredDateCards);
    } else {
      setSelectedCards(remonthData);
    }
  }, [remonthData, selectedDate]);

  const handleClose = () => {
    setSelectedDate({ start: startDate, end: endDate });
    setIsModal(false);
    setIsDateModal(false);
  };

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
            <span className="color-num">{selectedCards.length}</span>
          </div>
          <button
            className="filter-btn flex"
            onClick={() => setIsModal(!isModal)}
          >
            <BiSliderAlt />
          </button>
        </div>
        {isModal && (
          <ul className="filter-box">
            <li className="list flex">
              <div className="list-name">기간</div>
              <div>
                <p
                  className="flex date-title"
                  onClick={() => setIsDateModal(!isDateModal)}
                >
                  {selectedDate.start && selectedDate.end ? (
                    <span className="selected-date">
                      {selectedDate.start} ~ {selectedDate.end}
                    </span>
                  ) : (
                    <span>기간 설정</span>
                  )}
                  {isDateModal ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </p>
                {isDateModal && (
                  <div className="input flex">
                    <input
                      type="month"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                      type="month"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </li>
            <li className="list ft flex">
              <button
                className="clear flex"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setSelectedDate({ start: "", end: "" });
                }}
              >
                <GrPowerReset />
                <span>초기화</span>
              </button>
              <button className="close" onClick={handleClose}>
                적용
              </button>
            </li>
          </ul>
        )}

        {selectedCards &&
          selectedCards.map((card) => (
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
                  <span className="card-num">
                    + {card.selectedCards.length}
                  </span>
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
    </div>
  );
}
