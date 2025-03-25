import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import axios from "axios";

import { Container, Form, Button } from "react-bootstrap";
import authService from "../../services/authService";

const ListItem = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    price: "",
    rentType: "",
    category: "",
    subcategory: "",
    state: "",
    city: "",
    condition: [],
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
  ];

  const additionalCondition = [
    "Any damage to the product will result in no refund of the deposit.",
    "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
    "Valid ID Proof Required.",
    "Any damage to the product should be informed before returning.",
    "Before modifying/changing/altering anything, take permission."
  ];

  const commoncondtionfurniture=[
    "Refundable security deposit ( after 7-day inspection)",
    "Professional deep cleaning before return",
    "No drilling/nailing/sanding without written consent",
    "Weight limits strictly enforced (see item specifications)",
    "Pest control mandatory for wooden items",
    "Original packaging required ",
    "No outdoor use unless explicitly approved", 
  ];

  const commoncondtiontool=[
    "Refundablesecurity deposit ( after 3-day inspection)",
    "Use only manufacturer-approved accessories",
    "No modifications to original equipment",
    "Environmental compliance - proper disposal of waste/debris",
    "Penalty for misuse", additionalCondition
  ];

  const commoncondtinshop=[
    "Refundable security deposit ( after 15-day inspection)",
    "Valid ID proof copy required.",
    "Valid GST registration & trade license required",
    "No structural modifications without written consent",
    "Maintain exterior cleanliness",
    "No illegal/subletting activities (immediate termination)",
    "Signage compliance with local municipal laws",
    "Business hours restricted to 7AM-11PM",
  ];

  const commoncondtionmachine=[
    "Refundable security deposit ( after 7-day inspection)",
    "Valid ITI/NCVT operator certification required.",
    "Use only manufacturer-recommended fuel/lubricants.",
    "Immediate reporting of breakdowns/accidents (within 2 hours)",
    "No overloading beyond rated capacity (see machine specifications)",
    "Environmental compliance - proper disposal of waste/oil as per CPCB norms",
    "Transportation by company-approved handlers only",
    "Return all original manuals/service records",
  ];

  const commoncondtionhouse=[
    "Refundable  security deposit ( after 30-day inspection)",
    "Valid ID copy required",
    "No structural modifications without written consent",
    "Maintenance responsibility: Renter (plumbing/electrical)",
    "3-month notice period for vacancy",
    "Police verification certificate mandatory",
    "No illegal/immoral activities (immediate termination)",
    "Maintain property tax receipts & EB bills",
  ]; 

  const conditions = {
    Vehicles: {
      "Luxury Car": [
        "Minimum age: 20 years",
        "GPS tracking mandatory (device provided)",
        "Valet parking only in designated areas",
        "Premium car cover mandatory during parking",
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ], 
      "Electric Car":[
        "80% minimum battery charge at return",
        "Battery health report required",
        "No third-party charging stations",
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Bike": [
        "Speed limit: 60km/h (city), 80km/h (highway)",
        "Odometer reading at pickup/return", 
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Scooter": [
        "Daily battery charging mandatory",
        "Rain cover provided (₹500 penalty if missing)",
        "No electrical modifications",
        "Parking only in secured lots after 8PM", 
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Commercial Vehicle": [
        "Max load: 1.5 tonnes",
        "Driver logbook maintenance",
        "Weekly engine oil checks",
        "No construction waste transport", 
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."  
      ],
      "Truck/Tempo": [
        "CNG safety certificate required",
        "No passenger overloading",
        "Daily interior sanitization",
        "Meter calibration proof", 
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Cycle": [
        "No off-road usage",
        "Basket/seat cover mandatory", 
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Auto-Rickshaw": [
        "Fare meter functional certification",
        "Daily CNG tank pressure check",
        "No night driving (10PM-6AM)",
        "Passenger insurance mandatory", 
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ]
    },
    Electronics: {
      "TV": [
        "Screen protector must remain intact", 
        "No permanent wall mounting allowed", 
        "Burn-in protection settings enabled",  
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Fridge": [
        "Weekly defrosting required", 
        "Temperature setting locked between 2-4°C",
        "No food storage during return transit",
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Laptop": [
        "BIOS password setup required", 
        "Gaming limited to 4hrs/day", 
        "OS must be rolled back to original state", 
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Camera": [
        "UV filter mandatory (provided)", 
        "Memory card formatting after use", 
        "No lens swapping without approval",  
        "Any damage to the product will result in no refund of the deposit.",
        "If the repair cost exceeds the deposit, the renter must pay the extra amount.",
        "Valid ID Proof Required.",
        "Any damage to the product should be informed before returning.",
        "Before modifying/changing/altering anything, take permission."
      ],
      "Tablets": [
        "Kids mode restrictions enabled", 
        "No jailbreaking/rooting allowed", additionalCondition
      ],
      "Audio Visual Equipment": [
        "50% volume limit after 10PM",
        "Professional calibration only", additionalCondition
      ],
      "Printers": [
        "Monthly 500 sheet limit", 
        "Genuine ink only policy", 
        "No heavy cardstock printing", additionalCondition
      ],
      "Smartwatches": [
        "Charging cable deposit ₹800", 
        "No swimming/shower use", 
        "Health data auto-delete enabled",  additionalCondition
      ],
      "Wireless Microphones": [ additionalCondition
      ],
      "Mixers": [
        "Max 2hr continuous operation", 
        "No grinding hard spices", 
        "Weekly lubrication required", additionalCondition, commoncondtionfurniture
      ]
    },
    Furniture: {
      "Sofa": [
        "Anti-stain spray application (provided)",
        "No food/drinks allowed on fabric surfaces",
        "Professional upholstery cleaning every 3 months",  additionalCondition, commoncondtionfurniture
      ],
      "Bed": [
        "Waterproof mattress protector mandatory",
        "Monthly mattress rotation required",
        "No jumping/standing on bed frame",  additionalCondition, commoncondtionfurniture
      ],
      "Office Furniture": [
        "Cable management proof required",
        "No heavy equipment (>25kg) without base support", additionalCondition, commoncondtionfurniture
      ],
      "Dining Set" : [
        "Heat-resistant pads compulsory",additionalCondition, commoncondtionfurniture
      ],
      "Bookshelf": [
        "Wall anchoring mandatory",
        "Load distribution guidelines provided",
        "No encyclopedia/weighty book overloading",additionalCondition, commoncondtionfurniture
      ],
    },
    Machines:{
      "Construction":[
        "Max 12-hour daily operation",
        "Soil compaction test required",
        additionalCondition, commoncondtionmachine
      ],
      "Manufacturing": [
        "Temperature control (22°C-28°C) mandatory",
        "Coolant pH monitoring twice daily",
        additionalCondition, commoncondtionmachine
      ],
      manufacturing: [
        "Temperature control (22°C-28°C) mandatory",
        "Coolant pH monitoring twice daily",additionalCondition,commoncondtionmachine
      ],
      agricultural: [
        "Mud/debris cleaning before return",
        "No pesticide tank misuse",additionalCondition, commoncondtionmachine
      ],
      medical: [
        "Sterilization certificate after each use",
        "40-60% humidity control required",
        "FDA-approved consumables only",
        "Radiation safety protocols",additionalCondition, commoncondtionmachine
      ]
    },
    Costumes: {
      "Bridal Wear": [
        "Refundable deposit mendatory",
        "No open flames within 1 meters",
        "Size adjustments should be inform in advance",
        "Triple packaging mandatory (provided)",
        additionalCondition
      ],
      "Vintage": [
        "Climate-controlled transport only.",
        "Max 8-hour wear duration.",
        "Touch gloves provided (₹1000 deposit).",
        "No food/drinks while wearing",
        additionalCondition
      ],
      "Party Costumes": [
        "₹1000/day late return penalty",
        "Themed accessories deposit ₹3000",
        "Photo credit in social media posts",
        additionalCondition
      ],
      "Traditional Attire": [
        "No heavy jewelry attachments",
        "Cultural sensitivity training required",
        "Penalty for improper storage",
        additionalCondition
      ],
      "Children's Costumes": [
        "Size verification via height/weight",
        "No rough play clause",
        additionalCondition
      ],
      "Cosplay/Props": [
        "Weapon replica certification required",
        "Makeup trial restrictions",
        additionalCondition
      ],
    },
    Shop: {
      "Retail": [
        commoncondtionhouse,
      ],
      "Food": [
        "FSSAI license mandatory (displayed)",
        "Daily pest control certification",
        "Wet waste management contract required"
      ],
      "Office": [
        "Cable management certification",
        "No after-hours AC usage (9PM-7AM)",
        "Server room fire suppression system check"
      ],
      "Warehouse": [
        "Fire safety audit certificate (updated quarterly)",
        "No hazardous material storage",
        "Loading dock time restrictions (8AM-8PM)",
        "Pallet racking load limit compliance"
      ],
      "Medical" : [
        "Drug license displayed prominently",
        "Bio-medical waste disposal contract", commoncondtinshop
      ],
      "Salon/Spa": [
        "Weekly sanitization certificate", commoncondtinshop
      ],
      "Electronics": [
        "Voltage stabilizer (100KVA) mandatory", commoncondtinshop
      ]
    },
    House: {
      "Furnished": [
        "Penalty per damaged appliance",
        "AC servicing every 3 months (receipts)",
        "No relocation of heavy furniture",
        "Curtain/drapery dry cleaning before return", commoncondtionhouse
      ],
      "Unfurnished": [
        "No wall drilling/painting without approval",
        "Floor polishing mandatory before return",
        "Window grill installation approval required", commoncondtionhouse
      ],
      "Vacation Rental": [
        "Max 8 guests allowed.",
        "Penalty for unauthorized parties",
        "Staff tips included in rent", commoncondtionhouse
      ],
      "PG/Hostel": [
        "No overnight guests without ID proof",
        "11PM curfew",
        "Weekly room inspection rights",
        "Shared kitchen cleaning roster", commoncondtionhouse
      ],
      "Farmhouse": [
        "24/7 security guard deployment",
        "No agricultural cultivation without consent",
        "Water tanker arrangement responsibility", commoncondtionhouse
      ],
      "Apartment": [
        "Society rules compliance (noise/parking)",
        "Visitor parking pass system",
        "Balcony safety net installation",
        "Common area maintenance charges split", commoncondtionhouse
      ]
    },
    Tools: {
      "Power Tools": [
        "Voltage stabilizer (220V±5%) mandatory",
        "Blade/disc replacement at 50% wear",
        "Dust management system required", commoncondtiontool
      ],
      "Gardening Tools": [
        "No cross-contamination of pesticides/fertilizers",
        "Water usage log for irrigation equipment", commoncondtiontool
      ],
      "Construction Tools": [
        "Concrete mixer cleaning after each use",
        "No worksite sharing without approval", commoncondtiontool
      ],
      "Measuring Tools": [
        "No exposure to magnetic fields", commoncondtiontool
      ],
      "Mechanical Tools": [
        "Torque setting verification before use",
        "No disassembly of sealed components",
        "Gear oil grade compliance check", commoncondtiontool
      ],
      "Painting Tools": [
        "No mixing of incompatible paints",
        "Nozzle cleaning certification after use", commoncondtiontool
      ],
    },
  };

  const handleConditionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedConditions = checked
        ? [...prevData.condition, value]
        : prevData.condition.filter((cond) => cond !== value);
      return { ...prevData, condition: updatedConditions };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    if (formData.images.length + files.length > 10) {
      alert("Limit reached: Maximum 10 photos allowed.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files], // Append new images to existing ones
    }));
    setErrorMessage("");
  };

  const removeImage = (index) => {
    if (formData.images.length === 1) {
      alert("At least one image is required.");
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    // Required fields validation
    if (!formData.title || !formData.description || !formData.price || !formData.rentType || 
        !category || !subcategory || !state || !city || formData.images.length === 0) {
      alert("Please fill in all required fields and add at least one image");
      return;
    }
  
    // Append form fields
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rentType", formData.rentType);
    data.append("category", category);
    data.append("subcategory", subcategory);
    data.append("state", state);
    data.append("city", city);
    data.append("location", `${city}, ${state}`);
    data.append("userId", authService.getCurrentUser().user.id);
  
    // Append conditions
    if (formData.condition.length > 0) {
      formData.condition.forEach(cond => {
        data.append("item_condition", cond);
      });
    }
  
    // Append images
    formData.images.forEach(image => {
      data.append("images", image);
    });
  
    try {
      console.log("Submitting data:", Object.fromEntries(data));
      
      const response = await axios.post("http://localhost:5000/api/listings", data, {
        headers: { 
          "Content-Type": "multipart/form-data"
        }
      });
  
      console.log("Server Response:", response.data);
      
      if (response.data.item) {
        alert("Item Listed Successfully!");
        // Reset form
        setFormData({
          title: "",
          description: "",
          price: "",
          rentType: "",
          condition: [],
          images: []
        });
        setCategory("");
        setSubcategory("");
        setState("");
        setCity("");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      alert("Failed to list item: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Container className="p-4">
      <h2 className="text-center text-success mb-4">List Your Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-group">
          <Form.Label className="form-label">Select Category *</Form.Label>
          <div className="custom-select">
            <Form.Select 
              className="form-control"
              value={category} 
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
              }}
              required
              style={{
                appearance:'none'
              }}
            >
              <option value="" disabled className="placeholder-option">
                Choose a category
              </option>
              {Object.keys(conditions).map((cat) => (
                <option 
                  key={cat} 
                  value={cat}
                  style={{ color: 'var(--forest-deep)' }}
                >
                  {cat}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form.Group>

        {category && conditions[category] instanceof Object && (
          <Form.Group className="mb-3 form-group">
            <Form.Label className="form-label">Select Subcategory *</Form.Label>
            <div className="custom-select">
              <Form.Select 
                className="form-control"
                value={subcategory} 
                onChange={(e) => setSubcategory(e.target.value)}
                required
                style={{
                  border: '2px solid var(--sea-foam)',
                  borderRadius: '12px',
                  backgroundColor: 'var(--ivory-white)',
                  color: 'var(--deep-emerald)',
                  padding: '1rem 1.5rem',
                  appearance: 'none'
                }}
              >
                <option value="" disabled className="placeholder-option">
                  Choose a subcategory
                </option>
                {Object.keys(conditions[category]).map((sub) => (
                  <option 
                    key={sub} 
                    value={sub}
                    style={{ color: 'var(--forest-deep)' }}
                  >
                    {sub}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Name of the Product*</Form.Label>
          <Form.Control type="text" name="title" placeholder="e.g., (Car name)" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            placeholder="Item Details "
            value={formData.description}
            onChange={(e) => {
              const words = e.target.value.split(/\s+/).filter(word => word.length > 0); // Split words by spaces
              if (words.length <= 100) {
                setFormData({ ...formData, description: e.target.value });
              }
            }}
          />
          <small className="text-muted">
            {formData.description.split(/\s+/).filter(word => word.length > 0).length} / 100 words
          </small>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price (per day/week/month) *</Form.Label>
          <Form.Control type="number" name="price" placeholder="Enter rental price" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        </Form.Group>

        {/* Added Rent Type Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Rent Type *</Form.Label>
          <Form.Select value={formData.rentType} onChange={(e) => setFormData({ ...formData, rentType: e.target.value })}>
            <option value="">Choose rent type</option>
            <option value="Daily">Day</option>
            <option value="Weekly">Week</option>
            <option value="Monthly">Month</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select State *</Form.Label>
          <Form.Select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Choose a state</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City *</Form.Label>
          <Form.Control type="text" name="city" placeholder="Enter city/locality" onChange={(e) => setCity(e.target.value)} />
        </Form.Group>

        {subcategory && conditions[category]?.[subcategory] && (
          <Form.Group className="mb-3">
            <Form.Label>Condition *</Form.Label>
            <div className="d-flex flex-column"> {/* Ensures proper alignment */}
              {conditions[category][subcategory].map((cond) => (
                <Form.Check
                  key={cond}
                  type="checkbox"
                  label={cond}
                  value={cond}
                  onChange={handleConditionChange}
                  checked={formData.condition.includes(cond)}
                  className="mb-2 small-checkbox"// Adds spacing between checkboxes
                />
              ))}
            </div>
          </Form.Group>
        )}

        {/* Image Upload Field */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Images (Min 1, Max 10) *</Form.Label>
          <Form.Control type="file" accept="image/*" multiple onChange={handleImageChange} />
          <small className="text-muted">
            {formData.images.length === 0 ? "Maximum 10 photos" : `${formData.images.length} photos selected`}
          </small>
          {errorMessage && <p className="text-danger mt-1">{errorMessage}</p>}
        </Form.Group>

        {/* Preview Uploaded Images */}
        <div className="d-flex flex-wrap gap-2">
          {formData.images.map((image, index) => (
            <div key={index} className="position-relative">
              {/* If the image is a file object, show preview before upload */}
              {typeof image === "object" ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="rounded border"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              ) : (
                // If the image is already uploaded, fetch it from backend
                <img
                  src={`http://localhost:5000/images/${image}`}
                  alt={`Uploaded ${index}`}
                  className="rounded border"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              )}
              <Button
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0"
                onClick={() => removeImage(index)}
              >
                ✖
              </Button>
            </div>
          ))}
        </div>

        <Button variant="success" size="lg" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ListItem;
