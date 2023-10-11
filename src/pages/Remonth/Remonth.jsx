import React from "react";
import "./Remonth.scss";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

export default function Remonth() {
  return (
    <div className="remonth">
      <Header />
      <div className="content"></div>
      <MobileNavbar />
    </div>
  );
}
