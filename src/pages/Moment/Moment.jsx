import React, { useEffect, useState } from "react";
import "./Moment.scss";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { BiSliderAlt } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
// import "react-datepicker/dist/react-datepicker.module.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useNavigate } from "react-router-dom";

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

export default function Moment({ moments }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [list, setList] = useState();

  useEffect(() => {
    setList(() => {
      if (selectedCategory.length !== 0) {
        return moments.filter((card) =>
          selectedCategory.includes(card.category)
        );
      } else {
        return moments;
      }
    });
  }, [selectedCategory, moments]);

  return (
    <div className="moment">
      <PageHeader title={"모먼트"} />
      <div className="content">
        <div className="block-title flex">
          <div>
            <span>전체</span>
            <span className="color-num">{list && list.length}</span>
          </div>
          <button
            className="filter-btn flex"
            onClick={() => setIsModal(!isModal)}
          >
            <BiSliderAlt />
          </button>
        </div>
        {selectedCategory.length !== 0 && (
          <div className="selected-ct">
            <ul className="flex">
              {selectedCategory.map((item) => (
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
        )}

        {isModal && (
          <ul className="filter-box">
            <li className="list flex">
              <div className="list-name">카테고리</div>
              <ul className="category-list flex">
                {categroyList.map((list) => (
                  <li
                    key={list}
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
        {list && (
          <div className="momentList-ct">
            {list.map((card) => (
              <div
                key={card.id}
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
        )}
      </div>

      <MobileNavbar />
    </div>
  );
}
