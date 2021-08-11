const User = require("../models/user");
const base64Img = require("base64-img");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

// register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const image = req.body.avatar;
  //Find extension of file
  const ext = image.substring(image.indexOf("/") + 1, image.indexOf(";base64"));
  //create a unique filename
  const filename = `${uuidv4()}.${ext}`;
  //Forming regex to extract base64 data of file.
  const fileType = image.substring("data:".length, image.indexOf("/"));
  const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, "gi");
  //Extract base64 data.
  const base64Data = image.replace(regex, "");
  /*path of the folder where your project is saved. (In my case i got it from config file, root path of project).*/
  const uploadPath = __basedir + "/public/";
  //path of folder where you want to save the image.
  const localPath = `${uploadPath}/uploads/profiles/`;
  //Check that if directory is present or not.
  let newUrl = "default_avatar.jpg";
  if (fs.existsSync(`${uploadPath}/`)) {
    if (image) {
      fs.writeFileSync(localPath + filename, base64Data, "base64");
      newUrl = filename;
    } else {
      console.log("Avatar not available");
    }
  }

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      url: newUrl,
    },
  });

  sendToken(user, 200, res);
});

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // check if email and pasword is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  sendToken(user, 200, res);
});

// forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email.", 404));
  }

  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // create reset password url
  //const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password token is as follows:\n\n${resetUrl}\n\nIf you have not requested for this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "MIMS Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // hash the URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or has expired.", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match.", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler(`Old password is incorrect.`));
  }
  user.password = req.body.password;

  await user.save();
  sendToken(user, 200, res);
});

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const image = req.body.avatar;
  //Upadte avatar : TODO
  if (image !== "") {
    const user = await User.findById(req.user.id);

    const localPath = `${__basedir}/public/uploads/profiles/`;
    const oldImageName = user.avatar.url;

    if (oldImageName !== "default_avatar.jpg") {
      try {
        fs.unlinkSync(localPath + oldImageName);
        console.log("file removed");
      } catch (err) {
        console.error(err);
      }
    }
    //Find extension of file
    const ext = image.substring(
      image.indexOf("/") + 1,
      image.indexOf(";base64")
    );
    //create a unique filename
    const filename = `${uuidv4()}.${ext}`;
    //Forming regex to extract base64 data of file.
    const fileType = image.substring("data:".length, image.indexOf("/"));
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, "gi");
    //Extract base64 data.
    const base64Data = image.replace(regex, "");
    console.log(base64Data.length / 1e6, "MB is");
    //path of folder where you want to save the image.
    const path = localPath + filename;
    fs.writeFileSync(path, base64Data, "base64");
    if (fs.existsSync(path)) {
      // path exists
      console.log("exists:", path);
    } else {
      filename = "default_avatar.jpg";
      console.log("DOES NOT exist:", path);
    }

    newUserData.avatar = {
      url: filename,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// admin Routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get user detail => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User with id: ${req.params.id} not found`));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete user => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User with id: ${req.params.id} not found`));
  }

  // Remove Avatat from Uploads - TODO

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
