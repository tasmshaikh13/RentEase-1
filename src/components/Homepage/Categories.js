import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTshirt, FaCar, FaCogs, FaTv, FaTools, FaHome, FaStore, FaCouch } from "react-icons/fa";

const categories = [
  { icon: <FaTshirt size={30} />, label: "Costumes", path: "Costumes" },
  { icon: <FaCar size={30} />, label: "Vehicles", path: "Vehicles" },
  { icon: <FaCogs size={30} />, label: "Machines", path: "Machines" },
  { icon: <FaTv size={30} />, label: "Electronics", path: "Electronics" },
  { icon: <FaTools size={30} />, label: "Tool", path: "Tool" },
  { icon: <FaHome size={30} />, label: "House", path: "House" },
  { icon: <FaStore size={30} />, label: "Shop", path: "Shop" },
  { icon: <FaCouch size={30} />, label: "Furniture", path: "Furniture" }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryPath) => {
    navigate(`/category/${categoryPath}`);
  };

  return (
    <Container className="text-center py-4" style={{ backgroundColor: "#4a772f", color: "white" }}>
      <h3>Categories</h3>
      <Row className="d-flex justify-content-center">
        {categories.map((category, index) => (
          <Col
            key={index}
            className="d-flex flex-column align-items-center mx-2 category-box"
            onClick={() => handleCategoryClick(category.path)}
            style={{ cursor: "pointer" }} // Make it look clickable
          >
            {category.icon}
            <p className="mt-2 mb-0">{category.label}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
