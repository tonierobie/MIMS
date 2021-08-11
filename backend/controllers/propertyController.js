const Property = require("../models/property");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const multer = require("multer");
const path = require("path");
const base64Img = require("base64-img");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const saveImages = (images, i, newDirName) => {
  //Find extension of file
  const ext = images[i].substring(
    images[i].indexOf("/") + 1,
    images[i].indexOf(";base64")
  );
  //create a unique filename
  const filename = `${uuidv4()}.${ext}`;
  //Forming regex to extract base64 data of file.
  const fileType = images[i].substring("data:".length, images[i].indexOf("/"));
  const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, "gi");
  //Extract base64 data.
  const base64Data = images[i].replace(regex, "");
  //path of folder where you want to save the image.
  const newPath = `${newDirName}/`;
  //Check that if directory is present or not.
  //console.log(i + ' = our file is wewe' + images.length + '= images length')
  if (fs.existsSync(`${newPath}/`)) {
    if (images[i]) {
      fs.writeFileSync(newPath + filename, base64Data, "base64");
      return (newUrl = filename);
    } else {
      console.log("File not uploaded");
    }
  }
};
// Create new property   =>   /api/v1/admin/property/new
exports.newProperty = catchAsyncErrors(async (req, res, next) => {
  let images = req.body.images;
  let imagesLinks = [
    {
      url: "no_file.jpg",
    },
  ];
  const localPath = __basedir + `/public/uploads/properties`;
  let newDirId = "nofile";
  let newUrl = "no_file.jpg";
  if (images) {
    imagesLinks = [];
    newDirId = uuidv4();
    // create a new directory for new files upload
    let newDirName = `${localPath}/${newDirId}`;
    //Check that if directory is present or not. If not Create it
    if (!fs.existsSync(newDirName)) {
      fs.mkdirSync(newDirName, {
        recursive: true,
      });
    }

    if (images.length > 10) {
      //Find extension of file
      const ext = images.substring(
        images.indexOf("/") + 1,
        images.indexOf(";base64")
      );
      //create a unique filename
      const filename = `${uuidv4()}.${ext}`;
      //Forming regex to extract base64 data of file.
      const fileType = images.substring("data:".length, images.indexOf("/"));
      const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, "gi");
      //Extract base64 data.
      const base64Data = images.replace(regex, "");
      //path of folder where you want to save the image.
      const newPath = `${newDirName}/`;
      //Check that if directory is present or not.
      //console.log(i + ' = our file is wewe' + images.length + '= images length')
      if (fs.existsSync(`${newPath}/`)) {
        if (images) {
          fs.writeFileSync(newPath + filename, base64Data, "base64");
          newUrl = filename;
        } else {
          console.log("File not uploaded");
        }
      }
      imagesLinks.push({
        url: newUrl,
      });
    } else {
      for (let i = 0; i < images.length; i++) {
        newUrl = saveImages(images, i, newDirName);
        imagesLinks.push({
          url: newUrl,
        });
      }
    }
  }

  req.body.imageDir = newDirId;
  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const property = await Property.create(req.body);

  res.status(201).json({
    success: true,
    property,
  });
});

// get all property => /api/v1/properties?keyword=rent
exports.getProperties = catchAsyncErrors(async (req, res, next) => {
  // Number of properties to display per page
  const resPerPage = 8;
  const propertiesCount = await Property.countDocuments();
  const apiFeatures = new APIFeatures(Property.find(), req.query)
    .search()
    .filter();
  let properties = await await apiFeatures.query;
  let filteredPropertiesCount = properties.length;
  apiFeatures.pagination(resPerPage);
  properties = await apiFeatures.query;
  res.status(200).json({
    success: true,
    propertiesCount,
    resPerPage,
    filteredPropertiesCount,
    properties,
  });
});

// Get all properties (Admin) => /api/v1/admin/properties
exports.getAdminProperties = catchAsyncErrors(async (req, res, next) => {
  const properties = await Property.find();

  res.status(200).json({
    success: true,
    properties,
  });
});

// get single property details => /api/v1/property/:id

exports.getSingleProperty = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    return next(new ErrorHandler("property not found", 404));
  }
  res.status(200).json({
    success: true,
    property,
  });
});

// update property => /api/v1/admin/property/:id
exports.updateProperty = catchAsyncErrors(async (req, res, next) => {
  let property = await Property.findById(req.params.id);

  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  let images = req.body.images;

  if (images) {
    imagesLinks = [];
    newDirId = uuidv4();
    // create a new directory for new files upload
    const localPath = __basedir + `/public/uploads/properties/`;
    let newDirName = `${localPath}/${newDirId}`;
    // Delete old images folder
    if (property.imageDir !== "nofile") {
      const oldPath = `${localPath}/${property.imageDir}`;

      try {
        if (fs.existsSync(oldPath)) {
          fs.rmdirSync(oldPath, { recursive: true });
          //console.log("Folder Deleted");
        }
      } catch (err) {
        console.error(err);
      }
    }

    //Check that if directory is present or not. If not Create it
    if (!fs.existsSync(newDirName)) {
      fs.mkdirSync(newDirName, {
        recursive: true,
      });
    }

    if (images.length > 10) {
      //Find extension of file
      const ext = images.substring(
        images.indexOf("/") + 1,
        images.indexOf(";base64")
      );
      //create a unique filename
      const filename = `${uuidv4()}.${ext}`;
      //Forming regex to extract base64 data of file.
      const fileType = images.substring("data:".length, images.indexOf("/"));
      const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, "gi");
      //Extract base64 data.
      const base64Data = images.replace(regex, "");
      //path of folder where you want to save the image.
      const newPath = `${newDirName}/`;
      //Check that if directory is present or not.
      //console.log(i + ' = our file is wewe' + images.length + '= images length')
      if (fs.existsSync(`${newPath}/`)) {
        if (images) {
          fs.writeFileSync(newPath + filename, base64Data, "base64");
          newUrl = filename;
        } else {
          console.log("File not uploaded");
        }
      }
      imagesLinks.push({
        url: newUrl,
      });
    } else {
      for (let i = 0; i < images.length; i++) {
        newUrl = saveImages(images, i, newDirName);
        imagesLinks.push({
          url: newUrl,
        });
      }
    }
    req.body.imageDir = newDirId;
    req.body.images = imagesLinks;
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    property,
  });
});

//delete property => /api/v1/admin/property/:id

exports.deleteProperty = catchAsyncErrors(async (req, res) => {
  let property = await Property.findByIdAndDelete(req.params.id);
  try {
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "property not found",
      });
    }
    if (property) {
      const imgFolder = property.imageDir;
      if (imgFolder !== "nofile") {
        // Delete Image from uploads -> properties folder
        const dirPath = __basedir + `/public/uploads/properties/${imgFolder}`;
        if (fs.existsSync(dirPath)) {
          fs.rmdirSync(dirPath, { recursive: true });
          console.log(`${dirPath} is deleted`);
        }
      }

      await property.remove();

      return res.status(200).json({
        success: true,
        message: "property deleted successfully",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Create new review  => /api/v1/review
exports.createPropertyReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, propertyId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const property = await Property.findById(propertyId);

  const isReviewed = property.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    property.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    property.reviews.push(review);
    property.numOfReviews = property.reviews.length;
  }

  property.ratings =
    property.reviews.reduce((acc, item) => item.rating + acc, 0) /
    property.reviews.length;

  await property.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get property Reviews => /api/v1/reviews
exports.getPropertyReviews = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: property.reviews,
  });
});

// Delete property Review => /api/v1/review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const property = await Property.findById(req.query.propertyId);

  const reviews = property.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    property.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await property.findByIdAndUpdate(
    req.query.propertyId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
