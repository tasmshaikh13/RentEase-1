import React from "react";
import { Navbar, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaUserCircle, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import "../css/header.css";

const RentEaseNavbar = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#4b792b" }} className="shadow-sm py-2">
      <Container className="d-flex justify-content-between align-items-center">
        
        {/* Left Section: Logo & Tagline */}
        <Navbar.Brand href="/" className="text-white fw-bold">
          Why Buy When <br /> You Can Rent
        </Navbar.Brand>

        {/* Middle Section: Search Bar */}
        <Form className="d-flex flex-grow-1 justify-content-center">
          <div className="position-relative w-75">
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2 rounded-pill ps-4"
            />
            <FaSearch
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#555",
              }}
            />
          </div>
        </Form>

        {/* Right Section: Location, List Button & Profile */}
        <div className="d-flex align-items-center">
          {/* Location Dropdown */}
          <NavDropdown
            title={<><FaMapMarkerAlt className="me-1" /><span className="d-none d-md-inline">Location</span></>}
            id="location-dropdown"
            className="text-white me-3"
          >
            <NavDropdown.Item href="#bangalore">Bangalore</NavDropdown.Item>
            <NavDropdown.Item href="#mumbai">Mumbai</NavDropdown.Item>
            <NavDropdown.Item href="#pune">Pune</NavDropdown.Item>
          </NavDropdown>

          {/* List Button */}
          <Button 
            variant="light" 
            className="me-3 d-flex align-items-center" 
            onClick={() => navigate('/list')}
          >
            <FaPlus className="me-1" /> List
          </Button>

          {/* Profile Section */}
          <NavDropdown 
            title={
              <div className="d-inline">
                <FaUserCircle size={30} color="white" />
                {currentUser && <span className="ms-2 text-white">{currentUser.username}</span>}
              </div>
            }
            id="profile-dropdown"
            align="end"
          >
            {currentUser ? (
              <>
                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/my-listings')}>My Listings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item onClick={() => navigate('/login')}>Login</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/signup')}>Sign Up</NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default RentEaseNavbar;
