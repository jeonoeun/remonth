import React, { useEffect, useState } from "react";
import "./Moment.scss";
import { AiOutlineClose } from "react-icons/ai";
import { BiSliderAlt } from "react-icons/bi";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import categoryList from "../../data";

export default function Moment({ moments }) {
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
          <div className="amount-title">
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
                {categoryList.map((list) => (
                  <li
                    key={list.type}
                    onClick={() => {
                      selectedCategory.includes(list.type)
                        ? setSelectedCategory(
                            selectedCategory.filter((e) => e !== list.type)
                          )
                        : setSelectedCategory((prev) => [...prev, list.type]);
                    }}
                    className={selectedCategory.includes(list.type) ? "on" : ""}
                  >
                    {list.type}
                  </li>
                ))}
              </ul>
            </li>
            <li className="list ft flex">
              <button
                className="clear flex"
                onClick={() => setSelectedCategory([])}
              >
                <span>초기화</span>
                <GrPowerReset />
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
                <div className="card-name">
                  <p className="card-title">{card.title}</p>
                  <div className="user flex">
                    <img src={card.user.image} alt="" className="user-img" />
                    <span>{card.user.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
