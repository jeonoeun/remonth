import React from "react";
import "./MyPage.scss";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

export default function MyPage() {
  return (
    <div className="myPage">
      <Header />
      <div className="content"></div>
      <MobileNavbar />
    </div>
  );
}
