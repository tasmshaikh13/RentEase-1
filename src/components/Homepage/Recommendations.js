import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      // Change the endpoint to match your backend route
      const response = await axios.get("http://localhost:5000/api/all");
      console.log("Fetched listings:", response.data);
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center text-success mb-4">Available Items</h2>
      <Row>
        {listings.length > 0 ? (
          listings.map((item, index) => (
            <Col
              onClick={() => {
                navigate(`/listings/${item._id}`);
              }}
              md={4}
              key={index}
              className="mb-4"
            >
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={
                    item.images &&
                    item.images.length > 0 &&
                    `http://localhost:5000/uploads/${item.images[0]}`
                  }
                  alt={item.title}
                  crossOrigin="anonymous"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Text>
                    <strong style={{ fontSize: 18 }}>₹{item.price}</strong>/
                    {item.rentType}
                  </Card.Text>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {item.product_description?.substring(0, 80)}...
                  </Card.Text>
                  <Card.Text>
                    <FaMapMarkerAlt size={18} /> {item.city}, {item.state}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No items available</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Recommendations;
