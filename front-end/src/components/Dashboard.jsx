import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Navigate, useNavigate } from "react-router-dom";

import DailyCalories from "./DailyCalories";
import MyNavbar from "./MyNavbar";
import { Card, Container } from "react-bootstrap";
import "../assets/dashboard.css";

const Dashboard = () => {
  const userDto = useSelector((state) => state.userDto);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userDto);
  }, []);

  return (
    <>
      <MyNavbar />
      <Container className="mt-4">
        <Card className="p-4">
          <Card.Title>
            <span className="total-calories">{userDto.dailyCaloricNeeds}</span>
            <span className="fs-1"> Kcal</span>
            <p>My Daily Caloric Need 😊</p>
          </Card.Title>
          <Card.Body></Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
