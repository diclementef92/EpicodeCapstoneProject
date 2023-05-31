import {
  Container,
  Image,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
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
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar expand="md" bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center" href="./">
            <Image src={logo} width={40} className="me-4" />
            <span className="brand-name">StayHealth</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-between text-center"
            id="responsive-navbar-nav"
          >
            <Nav>
              {" "}
              <Nav.Link
                as={NavLink}
                activeclassname="active-link"
                to="/dashboard"
              >
                DashBoard
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                activeclassname="active-link"
                to="/myprofile"
              >
                My Profile
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                activeclassname="active-link"
                to="/weights"
              >
                Weight Measurements
              </Nav.Link>
              <Nav.Link as={NavLink} activeclassname="active-link" to="/foods">
                Food calories
              </Nav.Link>
            </Nav>{" "}
            <div>
              {userDto.username}{" "}
              <OverlayTrigger
                placement="bottom"
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
