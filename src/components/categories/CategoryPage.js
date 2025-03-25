import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Get category from URL
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/items?category=${categoryName}`);
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
      <h2 className="text-center">Items in {categoryName}</h2>
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col key={item.id} md={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: ${item.price}/day</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No items available in this category.</p>
        )}
      </Row>
    </Container>
  );
};

export default CategoryPage;
