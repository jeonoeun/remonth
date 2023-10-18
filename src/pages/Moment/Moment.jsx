import React, { useEffect, useState } from "react";
import "./Moment.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { GoCircle, GoCheckCircleFill } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiComment, BiSliderAlt } from "react-icons/bi";

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
  const [isCategoryModal, setIsCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const selectedCards =
    selectedCategory.length === 0
      ? moments
      : moments.filter((card) => selectedCategory.includes(card.category));

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
            onClick={() => setIsCategoryModal(true)}
          >
            <BiSliderAlt />
          </button>
        </div>
        <div className="content-title-ct">
          {/* <div className="category-ct flex">
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
          </div> */}
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
        </div>
        <div className="momentList-ct">
          {selectedCards.map((card) => (
            <div
              key={card.id}
              className="moment-card"
              onClick={() => navigate(`/${card.id}`)}
            >
              <div className="moment-card-title flex">
                <div className="user flex">
                  <img src={card.user.image} alt="" className="user-img" />
                  <div className="flex">
                    <p>{card.user.name}</p>
                    <p>{card.date}</p>
                  </div>
                </div>
                <button>
                  <BsThreeDotsVertical />
                </button>
              </div>

              <div className="img-ct">
                <img src={card.image} alt="" className="card-img" />
                {/* <div className="filter"></div> */}
                {today === card.date && <span className="new-tag">new</span>}
              </div>
              <div className="card-util flex">
                <div className="flex">
                  <button>
                    <AiOutlineHeart />
                  </button>
                  <button>
                    <BiComment />
                  </button>
                </div>
                <span>0 likes</span>
              </div>
              <div className="card-info flex">
                <p className="card-title">{card.title.repeat(3)}</p>
                <p className="card-review">{card.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MobileNavbar />
      {isCategoryModal && (
        <div className="modal">
          <div className="modal-hd">카데고리 선택</div>
          <ul className="category-list flex">
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
          <div className="btn-area flex">
            <button className="clear" onClick={() => setSelectedCategory([])}>
              초기화
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
