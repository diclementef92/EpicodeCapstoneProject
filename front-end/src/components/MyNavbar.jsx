import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Image,
  Nav,
  NavLink,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FetchUser } from "../hooks/FetchUser";
import { useDispatch, useSelector } from "react-redux";
import DailyCalories from "./DailyCalories";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo.png";

const MyNavbar = () => {
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
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="./">
            <Image src={logo} width={40} className="me-4" />
            StayHealth
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="d-flex justify-content-between">
            <Nav>
              <Nav.Link href="./dashboard">DashBoard</Nav.Link>
              <Nav.Link href="./myprofile">My Profile</Nav.Link>
              <Nav.Link href="./weights">Weight Measurements</Nav.Link>
              <Nav.Link href="./foods">Food calories</Nav.Link>
            </Nav>{" "}
          </Navbar.Collapse>
          <div>
            {userDto.username}{" "}
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <BiLogOut onClick={handleLogOut} style={{ cursor: "pointer" }} />
            </OverlayTrigger>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
