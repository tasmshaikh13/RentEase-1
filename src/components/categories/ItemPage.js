import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const ItemPage = () => {
  const { itemId } = useParams(); // Get category from URL
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/items/${itemId}`
        );
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [itemId]);

  return (
    <Container>
      <Row style={{ marginTop: 30 }}>
        <Col style={{ width: 500 }}>
          <Card.Img
            style={{ width: 600 }}
            variant="top"
            src={
              item.images &&
              item.images.length > 0 &&
              `http://localhost:5000/uploads/${item.images[0]}`
            }
            crossOrigin="anonymous"
          />
        </Col>
        <Col>
          <div
            style={{
              border: "0.5px solid black",
              borderRadius: 4,
              width: "400px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <div>{item.title}</div>
            <div>
              <strong style={{ fontSize: 18 }}>${item.price}</strong>/day
            </div>
          </div>
          <div
            style={{
              border: "0.5px solid black",
              borderRadius: 4,
              width: "400px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            Description
            <div>{item.product_description}</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            style={{
              border: "0.5px solid black",
              borderRadius: 4,
              width: 600,
              padding: "20px",
              marginTop: "20px",
            }}
          >
            Terms and Condition
            <ul>
              {item &&
                item.item_condition &&
                item.item_condition.map((condition) => <li>{condition}</li>)}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemPage;
