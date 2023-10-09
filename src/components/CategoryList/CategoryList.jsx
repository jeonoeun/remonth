import React from "react";
import "./CategoryList.scss";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function CategoryList() {
  return (
    <div className="category-list">
      <div className="title flex">
        <p>10월의 모먼트</p>
        <div className="flex">
          <span>총 6개</span>
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
      <ul>
        <li className="flex book">
          <div className="flex name">
            <div className="color"></div>
            <p>10월의 책</p>
          </div>
          <span>+ 6</span>
        </li>
        <li className="flex book">
          <div className="flex name">
            <div className="color"></div>
            <p>10월의 음악</p>
          </div>
          <span>+ 6</span>
        </li>
        <li className="flex book">
          <div className="flex name">
            <div className="color"></div>
            <p>10월의 영상</p>
          </div>
          <span>+ 6</span>
        </li>
        <li className="flex book">
          <div className="flex name">
            <div className="color"></div>
            <p>10월의 순간</p>
          </div>
          <span>+ 6</span>
        </li>
        <li className="flex book">
          <div className="flex name">
            <div className="color"></div>
            <p>10월의 음식</p>
          </div>
          <span>+ 6</span>
        </li>
      </ul>
    </div>
  );
}
