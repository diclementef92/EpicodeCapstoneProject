import {
  Container,
  Image,
  Nav,
  NavLink,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "../assets/Navbar.css";

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
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="./">
            <Image src={logo} width={40} className="me-4" />
            StayHealth
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <NavLink href="./dashboard" activeClassName="active">
                DashBoard
              </NavLink>
              <NavLink href="./myprofile" activeClassName="active">
                My Profile
              </NavLink>
              <NavLink href="./weights" activeClassName="active">
                Weight Measurements
              </NavLink>
              <NavLink href="./foods" activeClassName="active">
                Food calories
              </NavLink>
            </Nav>{" "}
            <div>
              {userDto.username}{" "}
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  onClick={handleLogOut}
                />
              </OverlayTrigger>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
