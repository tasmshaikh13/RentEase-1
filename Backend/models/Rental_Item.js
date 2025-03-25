const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    rental_item_id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    product_description: { type: String, required: true },
    security_deposit: { type: Number, required: true },
    price: { type: Number, required: true },
    rentType: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
    availability: { type: Boolean, default: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    renter_id: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    item_condition: [{ type: String }],
    images: [{ type: String }],
}, {
    timestamps: true
});

module.exports = mongoose.model("Item", itemSchema, "rental_items");
