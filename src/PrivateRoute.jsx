import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (currentUser) {
    return <Outlet />;
  }

  return <Navigate replace to="/login" />;
}
