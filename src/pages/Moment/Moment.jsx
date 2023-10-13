import React, { useState } from "react";
import "./Moment.scss";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { GoCircle, GoCheckCircleFill } from "react-icons/go";

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

  return (
    <div className="moment">
      <Header />
      <div className="content">
        <div className="title-ct">
          <div className="category-ct flex">
            <div className="button-icon">
              <BiSolidCategoryAlt />
            </div>
            <div className="list-ct flex">
              {categroyList
                .filter((_, i) => i < 4)
                .map((item) => (
                  <div
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
          <p className="total">전체 {moments.length}</p>
        </div>
        <div className="momentList-ct">
          {moments.map((card) => (
            <div
              className="moment-card"
              onClick={() => navigate(`/${card.id}`)}
            >
              <img src={card.image} alt="" className="card-img" />
              <div className="card-info">
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
            <button className="clear" onClick={() => setSelectedCategory(null)}>
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
