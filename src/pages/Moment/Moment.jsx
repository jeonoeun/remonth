import React, { useEffect, useState } from "react";
import "./Moment.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { GoCircle, GoCheckCircleFill } from "react-icons/go";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiComment, BiSliderAlt } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";

const categroyList = [
  "노래",
  "책",
  "영상",
  "음식",
  "소비",
  "공간",
  "운동",
  "순간",
];

export default function Moment() {
  const [today, setToday] = useState();
  const moments = useSelector((state) => state.moments.moments);
  const navigate = useNavigate();
  const [isCategoryModal, setIsCategoryModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const selectedCards =
    selectedCategory.length === 0
      ? moments
      : moments.filter((card) => selectedCategory.includes(card.category));

  const [startDate, setStartDate] = useState(new Date("2023/10/01"));
  const [endDate, setEndDate] = useState(new Date("2023/10/19"));
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    function getToday() {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (1 + date.getMonth())).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      setToday(year + "-" + month + "-" + day);
    }

    getToday();
  }, []);

  return (
    <div className="moment">
      <div className="title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
        <p className="page-name">모먼트</p>
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
        <div className="selected-ct">
          <ul className="flex">
            {selectedCategory &&
              selectedCategory.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    const deleted = selectedCategory.filter(
                      (e) => !(e === item)
                    );
                    setSelectedCategory(deleted);
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
        {isModal && (
          <ul className="filter-box">
            <li className="list flex">
              <div className="list-name">카테고리</div>
              <ul className="category-list flex">
                {categroyList.map((list) => (
                  <li
                    onClick={() => {
                      selectedCategory.includes(list)
                        ? setSelectedCategory(
                            selectedCategory.filter((e) => e !== list)
                          )
                        : setSelectedCategory((prev) => [...prev, list]);
                    }}
                    className={selectedCategory.includes(list) && "on"}
                  >
                    {list}
                  </li>
                ))}
              </ul>
            </li>
            <li className="list ft flex">
              <button
                className="clear flex"
                onClick={() => setSelectedCategory([])}
              >
                <GrPowerReset />
                <span>초기화</span>
              </button>
              <button className="close" onClick={() => setIsModal(false)}>
                적용
              </button>
            </li>
          </ul>
        )}

        <div className="momentList-ct">
          {selectedCards.map((card) => (
            <div
              className="card-item"
              onClick={() => navigate(`/moment/${card.id}`)}
            >
              <div className="img-ct">
                <img src={card.image} alt="" />
                <div className="filter"></div>
              </div>
              <div className="card-name flex">
                <div className="left">
                  <p className="card-title">{card.title}</p>
                  <div className="user flex">
                    <img src={card.user.image} alt="" className="user-img" />
                    <div>
                      <span>{card.user.name}</span>
                    </div>
                  </div>
                </div>
                <p className="category">
                  <span>{card.category}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileNavbar />
      {isCategoryModal && (
        <div className="modal">
          <div className="modal-hd flex">
            <button
              className="close-btn flex"
              onClick={() => setIsCategoryModal(false)}
            >
              <AiOutlineClose />
            </button>
            <span className="hd-title">필터</span>
          </div>
          <div className="modal-inner">
            <div className="category-filter">
              <p className="filter-title">카테고리 설정</p>
              <ul className="category-list flex">
                {categroyList.map((list) => (
                  <li
                    onClick={() =>
                      setSelectedCategory((prev) => [...prev, list])
                    }
                    className="flex"
                  >
                    <span className="checked-icon">
                      {selectedCategory && selectedCategory.includes(list) ? (
                        <GoCheckCircleFill />
                      ) : (
                        <GoCircle />
                      )}
                    </span>
                    <span>{list}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="date-filter">
              <p className="filter-title">기간 설정</p>
              <div className="flex">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>
          </div>
          <div className="modal-ft flex">
            <button
              className="clear flex"
              onClick={() => setSelectedCategory([])}
            >
              <GrPowerReset />
              <span>초기화</span>
            </button>
            <button className="close" onClick={() => setIsCategoryModal(false)}>
              {selectedCards.length}개 표시
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
