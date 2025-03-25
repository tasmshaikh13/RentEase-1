import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a Mongoose Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    number: String
});

// Create a Mongoose Model
const User = mongoose.model('User', userSchema);

// Function to Insert Data
const addUser = async () => {
    const user = new User({
        name: "rachna gaonkar",
        age: 30,
        email: "gaonkar@example.com",
        number: "425",
        password:"abc12345"
    });

    try {
        const savedUser = await user.save();
        console.log("User added:", savedUser);
    } catch (err) {
        console.error("Error adding user:", err);
    }
};



// Call the function to add a user
addUser();


// Define Contact Schema
const contactSchema = new mongoose.Schema({
    contact_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    renter_id: { type: Number, required: true }
});

// Create Model
const Contact = mongoose.model('Contact', contactSchema);

// Function to Insert Data into Contact Collection
const addContact = async () => {
    const contact = new Contact({
        contact_id: 102,
        user_id: 2,
        renter_id: 3
    });

    try {
        const savedContact = await contact.save();
        console.log("✅ Contact added:", savedContact);
    } catch (err) {
        console.error("❌ Error adding contact:", err);
    }
};

// Insert a Contact Record
addContact();



// Define Renter Schema
const renterSchema = new mongoose.Schema({
    renter_id: { type: Number, required: true },
    email: { type: String, required: true, match: /^.+@.+$/ },
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact_no: { type: String, required: true, match: /^[0-9]{10}$/ },
    user_id: { type: Number, required: true }
});

// Create Model
const Renter = mongoose.model('Renter', renterSchema);

// Function to Insert Data into Renter Collection
const addRenter = async () => {
    const renter = new Renter({
        renter_id: 201,
        email: "renter@example.com",
        name: "saniya",
        address: "Bendwada sanguem goa",
        contact_no: "9876543210",
        user_id: 2
    });

    try {
        const savedRenter = await renter.save();
        console.log("✅ Renter added:", savedRenter);
    } catch (err) {
        console.error("❌ Error adding renter:", err);
    }
};

// Insert a Renter Record
addRenter();

// Define Review Schema
const reviewSchema = new mongoose.Schema({
    review_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    rental_item_id: { type: Number, required: true },
    rating: {
        type: [Number], // Array of numbers
        validate: {
            validator: function (ratings) {
                return ratings.every(r => r >= 1 && r <= 5); // Ensure all ratings are between 1 and 5
            },
            message: "Ratings must be between 1 and 5"
        }
    }
});

// Create Model
const Review = mongoose.model('Review', reviewSchema);

// Function to Insert Data into Review Collection
const addReview = async () => {
    const review = new Review({
        review_id: 307,
        user_id: 8,
        rental_item_id: 109,
        rating: [5, 5] // Example of multiple ratings
    });

    try {
        const savedReview = await review.save();
        console.log("✅ Review added:", savedReview);
    } catch (err) {
        console.error("❌ Error adding review:", err);
    }
};

// Insert a Review Record
addReview();


// Define Rental Items Schema
const rentalItemSchema = new mongoose.Schema({
    rental_item_id: { type: Number, required: true },
    product_description: { type: String, required: true },
    security_deposit: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    location: { type: String, required: true },
    renter_id: { type: Number, required: true },
    categories: { type: [String], required: true }, // Array of strings
    item_condition: {
        type: [String],
        enum: ["Good", "Bad", "OK Condition"], // Allowed values
        required: true
    }
});

// Create Model
const RentalItem = mongoose.model('Rental_items', rentalItemSchema);

// Function to Insert Data into Rental Items Collection
const addRentalItem = async () => {
    const rentalItem = new RentalItem({
        rental_item_id: 201,
        product_description: "Brand new DSLR Camera",
        security_deposit: 100.50,
        availability: true,
        location: "New York",
        renter_id: 5,
        categories: ["Electronics", "Camera"],
        item_condition: ["Good"]
    });

    try {
        const savedItem = await rentalItem.save();
    } catch (err) {
        console.error("❌ Error adding rental item:", err);
    }
};

// Insert a Rental Item Record
addRentalItem();



