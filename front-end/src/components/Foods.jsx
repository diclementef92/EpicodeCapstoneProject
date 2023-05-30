import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate, useNavigate } from "react-router-dom";

import DailyCalories from "./DailyCalories";
import MyNavbar from "./MyNavbar";

const Foods = () => {
  const userDto = useSelector((state) => state.userDto);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userDto);
  }, []);

  return <></>;
};

export default Foods;
