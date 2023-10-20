import React, { useState } from "react";
import "./Filter.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import moment from "moment";

export default function Filter() {
  const [startDate, setStartDate] = useState(new Date("2023/10/01"));
  const [endDate, setEndDate] = useState(new Date("2023/10/19"));
  console.log(moment(startDate).format("YYYY-MM-DD"));

  return (
    <div className="filterList">
      <div className="date-filter">
        <p>기간 설정</p>
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
  );
}
