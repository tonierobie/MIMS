const List = require("../models/list");
const Property = require("../models/property");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");

// create new list => /api/v1/list/new
exports.newList = catchAsyncErrors(async (req, res, next) => {
  // const sendNotification = await sendEmail({
  //   email: process.env.ADMIN_EMAIL,
  //   subject: "MIMS - New Wish List Created",
  //   message: "",
  // });

  console.log(req.user.name);

  const tosend = `${req.body.details.phoneNo} <br/> 
                  ${req.body.details.email} <br/> 
                  ${req.body.details.country}<br/>`;

  const items = req.body.listItems.map((item) => {
    const { name, price, quantity } = item;
    return `${name}<br/> 
            ${price}<br/>
            ${quantity}<br/>`;
  });
  console.log(tosend);
  console.log(items);

  const {
    listItems,
    details,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const list = await List.create({
    listItems,
    details,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    list,
  });
});

// get Single list => /api/v1/list/:id
exports.getSingleList = catchAsyncErrors(async (req, res, next) => {
  const list = await List.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!list) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(200).json({
    success: true,
    list,
  });
});

// get logged in user list => /api/v1/lists/me
exports.myLists = catchAsyncErrors(async (req, res, next) => {
  const lists = await List.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    lists,
  });
});

// get all lists - ADMIN => /api/v1/admin/lists
exports.allLists = catchAsyncErrors(async (req, res, next) => {
  const lists = await List.find();

  let totalAmount = 0;
  lists.forEach((list) => {
    totalAmount += list.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    lists,
  });
});

// Update / Process list - ADMIN => /api/v1/admin/list/:id
exports.updateList = catchAsyncErrors(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (list.listStatus === "Confirmed") {
    return next(new ErrorHandler("You have already confirmed this list.", 400));
  }

  list.listItems.forEach(async (item) => {
    await updateStock(item.property, item.quantity);
  });

  list.listStatus = req.body.status;
  list.confirmedAt = Date.now();

  await list.save();

  res.status(200).json({
    success: true,
    list,
  });
});

async function updateStock(id, quantity) {
  const property = await Property.findById(id);

  property.stock = property.stock - quantity;

  await property.save({ validateBeforeSave: false });
}

// Delete list => /api/v1/admin/list/:id
exports.deleteList = catchAsyncErrors(async (req, res, next) => {
  const list = await List.findById(req.params.id);
  if (!list) {
    return next(new ErrorHandler("List not found", 404));
  }

  await list.remove();

  res.status(200).json({
    success: true,
  });
});
