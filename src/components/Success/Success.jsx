import React from "react";
import "./Success.scss";

export default function Success({ text }) {
  return (
    <div className="success-box flex">
      <span className="bell-icon">🔔</span>
      <span>{text}</span>
    </div>
  );
}
