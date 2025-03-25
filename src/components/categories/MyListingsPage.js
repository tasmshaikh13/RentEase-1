import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import authService from "../../services/authService";

const MyListingsPage = () => {
  const { categoryName } = useParams(); // Get category from URL
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items?userId=${currentUser.user.id}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [categoryName]);

  return (
    <Container className="py-4">
      <h2 className="text-center">My Listings</h2>
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col onClick={() => {
              navigate(`/listings/${item._id}`);
            }} key={item._id} md={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={item.images && item.images.length > 0 
                    && `http://localhost:5000/uploads/${item.images[0]}`} crossOrigin="anonymous" />
                <Card.Body>
                  <Card.Text><strong style={{fontSize: 18}}>${item.price}</strong>/day</Card.Text>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.product_description}</Card.Text>
                  <Card.Text><FaMapMarkerAlt size={18} /> {item.city}, {item.state}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No items listed.</p>
        )}
      </Row>
    </Container>
  );
};

export default MyListingsPage;
