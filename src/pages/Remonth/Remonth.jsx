import React, { useEffect, useState } from "react";
import "./Remonth.scss";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BiSliderAlt } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function Remonth({ remonths }) {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState(remonths);
  const [isModal, setIsModal] = useState(false);
  const [isDateModal, setIsDateModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState({ start: "", end: "" });

  useEffect(() => {
    if (selectedDate.start && selectedDate.end) {
      const filteredDateCards = remonths.filter((card) => {
        return (
          card.month >= selectedDate.start && card.month <= selectedDate.end
        );
      });
      setSelectedCards(filteredDateCards);
    } else {
      setSelectedCards(remonths);
    }
  }, [remonths, selectedDate.start, selectedDate.end]);

  const handleClose = () => {
    setSelectedDate({ start: startDate, end: endDate });
    setIsModal(false);
    setIsDateModal(false);
  };

  return (
    <div className="remonth">
      <PageHeader title={"월간지"} />
      <div className="content">
        <div className="block-title flex">
          <div className="amount-title">
            <span>전체</span>
            <span className="color-num">
              {selectedCards && selectedCards.length}
            </span>
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
                  .map((item) => (
                    <div className="image" key={item.image}>
                      <img src={item.image} alt="" />
                    </div>
                  ))}
                <div className="filter"></div>
                <div className="user flex">
                  <div className="flex">
                    <img
                      src={card.userData.image}
                      alt=""
                      className="user-img"
                    />
                    <p>{card.userData.name}</p>
                  </div>
                  <span className="card-num">
                    {card.selectedCards.length !== 0 &&
                      "+ " + card.selectedCards.length}
                  </span>
                </div>
              </div>
              <div className="card-info">
                <p className="card-title">{card.title}</p>
                <p className="card-review">{card.review}</p>
                <div className="card-date flex">
                  <span>{card.month.slice(0, 4)}년</span>
                  <span>{card.month.slice(-2)} 월호</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
