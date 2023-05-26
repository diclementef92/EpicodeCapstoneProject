import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FetchUser } from "../hooks/FetchUser";
import { useDispatch, useSelector } from "react-redux";
import DailyCalories from "./DailyCalories";
import { BiLogOut } from "react-icons/bi";

const Dashboard = () => {
  const userDto = useSelector((state) => state.userDto);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userDto);
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      logout
    </Tooltip>
  );

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="./">StayHealth</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{userDto.username}</Navbar.Text>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <a onClick={handleLogOut}>
                <BiLogOut />
              </a>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Dashboard;
