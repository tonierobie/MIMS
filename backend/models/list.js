const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  details: {
    address: {
      type: String,
      required: [true, "Please enter your address."],
    },
    city: {
      type: String,
      required: [true, "Please enter your city."],
    },
    phoneNo: {
      type: String,
      required: [true, "Please enter your phone number."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
    },
    postalCode: {
      type: String,
      required: [true, "Please enter your postal code."],
    },
    country: {
      type: String,
      required: [true, "Please enter your country."],
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  listItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      property: {
        type: mongoose.Schema.ObjectId,
        ref: "Property",
        required: true,
      },
      imageDir: {
        type: String,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  listStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("list", listSchema);
