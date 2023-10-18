import React, { useState } from "react";
import "./Moment.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { GoCircle, GoCheckCircleFill } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";

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
  const moments = useSelector((state) => state.moments.moments);
  const navigate = useNavigate();
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const selectedCards =
    selectedCategory.length === 0
      ? moments
      : moments.filter((card) => selectedCategory.includes(card.category));

  return (
    <div className="moment">
      <div className="title">
        <button onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft />
        </button>
        <p className="page-name">모먼트</p>
      </div>
      <div className="content">
        <div className="content-title-ct">
          <div className="category-ct flex">
            <div className="button-icon">
              <FaFilter />
            </div>
            <div className="list-ct flex">
              {categroyList
                .filter((_, i) => i < 4)
                .map((item) => (
                  <div
                    key={item}
                    onClick={() =>
                      setSelectedCategory((prev) => [...prev, item])
                    }
                  >
                    {item}
                  </div>
                ))}
              <div onClick={() => setIsCategoryModal(true)}>더보기..</div>
            </div>
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
          <p className="total">전체 {selectedCards.length}</p>
        </div>
        <div className="momentList-ct">
          {selectedCards.map((card) => (
            <div
              key={card.id}
              className="moment-card"
              onClick={() => navigate(`/${card.id}`)}
            >
              <div className="img-ct">
                <img src={card.image} alt="" className="card-img" />
              </div>
              <div className="card-info flex">
                <p className="card-title">{card.title}</p>
                <div className="user flex">
                  <img src={card.user.image} alt="" className="user-img" />
                  <p>{card.user.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileNavbar />
      {isCategoryModal && (
        <div className="category-modal">
          <div className="modal-hd">
            카데고리 선택
            <button className="clear" onClick={() => setSelectedCategory([])}>
              초기화
            </button>
          </div>
          <ul className="flex">
            {categroyList.map((list) => (
              <li
                onClick={() => setSelectedCategory((prev) => [...prev, list])}
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
          <button className="close" onClick={() => setIsCategoryModal(false)}>
            확인
          </button>
        </div>
      )}
    </div>
  );
}
