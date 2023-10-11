import React from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";
import Detail from "./pages/Detail/Detail";
import Remonth from "./pages/Remonth/Remonth";
import Moment from "./pages/Moment/Moment";
import MyPage from "./pages/MyPage/MyPage";

export default function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/remonth" element={<Remonth />} />
        <Route path="/moment" element={<Moment />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </div>
  );
}
