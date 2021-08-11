const Property = require("../models/property");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const properties = require("../data/properties");

// settings dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProperties = async () => {
  try {
    await Property.deleteMany();
    console.log("Properties are deleted");
    await Property.insertMany(properties);
    console.log("All properties are added.");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProperties();
