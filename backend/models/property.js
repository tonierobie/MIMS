const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter property name"],
    trim: true,
    maxLength: [150, "Property name cannot exceed 150 characters"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "Please enter property price"],
    maxLength: [10, "Property name cannot exceed 10 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter property description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  imageDir: {
    type: String,
    required: true,
    default: "nofile",
  },
  images: [
    {
      url: {
        type: String,
        required: [true, "Please select an image"],
        default: "no_file.jpg",
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select category for this property"],
    enum: {
      values: [
        "Apartment for sale",
        "House for sale",
        "Office space for sale",
        "Warehouse for sale",
        "Land for sale",
        "Apartment for rent",
        "House for rent",
        "Office space for rent",
        "Warehouse for rent",
        "Land for Lease",
        "1 bedroom to let",
        "2 bedroom to let",
        "3 bedroom to let",
        "4 bedroom to let",
        "5 bedroom to let",
      ],
      message: "Please select correct category for property",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter property seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter property stock"],
    maxLength: [5, "Property stock cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema);
