import React from "react";
import "./Home.scss";
import CategoryList from "../../components/CategoryList/CategoryList";
import Calendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="content">
        <Calendar />
        {/* <CategoryList /> */}
      </div>
      <MobileNavbar />
    </div>
  );
}
