import React from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder/1" element={<Builder />} />
        <Route path="/builder/2" element={<Builder />} />
      </Routes>
    </>
  );
}
