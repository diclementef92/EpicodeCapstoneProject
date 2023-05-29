import {
  Container,
  Image,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
              <FontAwesomeIcon
                icon={faRightFromBracket}
                onClick={handleLogOut}
              />
            </OverlayTrigger>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
