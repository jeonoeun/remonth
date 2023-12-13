import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";
import Remonth from "./pages/Remonth/Remonth";
import Moment from "./pages/Moment/Moment";
import MyPage from "./pages/MyPage/MyPage";
import RemonthDetail from "./pages/RemonthDetail/RemonthDetail";
import { getMomentList, getRemonthList } from "./api/firebase";
import { selectCurrentUser } from "./store/user";
import { useDispatch, useSelector } from "react-redux";
import MomentDetail from "./pages/MomentDetail/MomentDetail";
import Header from "./components/Header/Header";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import { useMediaQuery } from "react-responsive";
import ScrollToTop from "./ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Success from "./components/Success/Success";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Search from "./pages/Search/Search";
import {
  selectAllMoments,
  setAllMoments,
  setUserMoments,
} from "./store/moments";
import {
  selectAllRemonths,
  setAllRemonths,
  setUserRemonths,
} from "./store/remonths";

export default function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState();
  const allMoments = useSelector(selectAllMoments);
  const allRemonths = useSelector(selectAllRemonths);
  const currentUser = useSelector(selectCurrentUser);
  const isMobile = useMediaQuery({ maxWidth: 728 });
  const isTablet = useMediaQuery({ minWidth: 729, maxWidth: 1279 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    setLoading(true);
    try {
      getMomentList((moments) => {
        dispatch(setAllMoments(moments));
        setLoading(false);
      });
    } catch (error) {
      console.error("data error:", error);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    try {
      getRemonthList((remonths) => {
        dispatch(setAllRemonths(remonths));
        setLoading(false);
      });
    } catch (error) {
      console.error("data error:", error);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    currentUser &&
      allMoments &&
      dispatch(
        setUserMoments(
          allMoments.filter((moment) => moment.user.id === currentUser.id)
        )
      );
  }, [allMoments, currentUser, dispatch]);

  useEffect(() => {
    currentUser &&
      allRemonths &&
      dispatch(
        setUserRemonths(
          allRemonths.filter(
            (remonth) => remonth.userData.id === currentUser.id
          )
        )
      );
  }, [allRemonths, currentUser, dispatch]);

  return (
    <div className="wrapper">
      <ScrollToTop />
      {isMobile ? null : <Header />}
      {loading ? (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/moment" element={<Moment />} />
            <Route
              path="/moment/:id"
              element={<MomentDetail setSuccess={setSuccess} />}
            />
            <Route path="/remonth" element={<Remonth />} />
            <Route
              path="/remonth/:id"
              element={<RemonthDetail setSuccess={setSuccess} />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route
                path="/builder/moment"
                element={<Builder setSuccess={setSuccess} />}
              />
              <Route
                path="/builder/remonth"
                element={<Builder setSuccess={setSuccess} />}
              />
            </Route>
            <Route path="/*" element={<NotFound />} />
            <Route path="/moment/*" element={<NotFound />} />
          </Routes>
        </div>
      )}

      {isDesktop || isTablet || pathname.includes("builder") || (
        <MobileNavbar />
      )}
      {success && <Success text={success} />}
    </div>
  );
}
