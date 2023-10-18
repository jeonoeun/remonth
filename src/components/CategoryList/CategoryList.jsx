import React, { useEffect, useState } from "react";
import "./CategoryList.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";

const categroyList = {
  노래: { eng: "music", color: "#F4CE14" },
  책: { eng: "book", color: "#3876BF" },
  영상: { eng: "video", color: "#A7D397" },
  음식: { eng: "food", color: "#9A4444" },
  소비: { eng: "item", color: "#D6D46D" },
  공간: { eng: "place", color: "#BEADFA" },
  운동: { eng: "workout", color: "#64CCC5" },
  순간: { eng: "moment", color: "#6A9C89" },
};

export default function CategoryList() {
  const [today, setToday] = useState();
  const currentUser = useSelector((state) => state.user.currentUser) || {};

  useEffect(() => {
    function getToday() {
      const date = new Date();
      const month = 1 + date.getMonth();
      setToday(month);
    }

    getToday();
  }, []);

  return (
    currentUser.cards && (
      <div className="category-list">
        <div className="title flex">
          <p>{today}월의 모먼트</p>
          <div className="flex">
            <span>총 {currentUser.cards.length}개</span>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <ul>
          {Object.keys(categroyList).map((list) => (
            <li className="flex book" key={list}>
              <div className="flex name">
                <div
                  className="color"
                  style={{ background: categroyList[list].color }}
                ></div>
                <p>
                  {today}월의 {list}
                </p>
              </div>
              <span>+ 6</span>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
