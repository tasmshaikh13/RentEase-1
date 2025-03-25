import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:5000/api/listings", formData, {
            headers: { "Content-Type": "application/json" },
        });
        
      alert(response.data.message);
      setFormData({ name: "", category: "", price: "", image: "", description: "" }); // Clear form
    } catch (error) {
      console.error("❌ Error submitting form:", error);
    }
  };

  return (
    <Container className="py-4">
      <h2>Add a New Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Item Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter item name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" placeholder="Enter category" value={formData.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" placeholder="Enter price" value={formData.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" placeholder="Enter image URL" value={formData.image} onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Add Item</Button>
      </Form>
    </Container>
  );
};

export default AddItem;
