import {
  Container,
  Image,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
          <Navbar.Brand className="d-flex align-items-center" href="./">
            <Image src={logo} width={40} className="me-4" />
            <span className="brand-name">StayHealth</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-between"
            id="responsive-navbar-nav"
          >
            <Nav>
              {" "}
              <Nav.Link
                as={NavLink}
                activeClassName="active-link"
                to="/dashboard"
              >
                DashBoard
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                activeClassName="active-link"
                to="/myprofile"
              >
                My Profile
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                activeClassName="active-link"
                to="/weights"
              >
                Weight Measurements
              </Nav.Link>
              <Nav.Link as={NavLink} activeClassName="active-link" to="/foods">
                Food calories
              </Nav.Link>
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
