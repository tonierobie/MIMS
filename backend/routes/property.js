const express = require("express");
const router = express.Router();

const {
  getProperties,
  getAdminProperties,
  newProperty,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  createPropertyReview,
  getPropertyReviews,
  deleteReview,
} = require("../controllers/propertyController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/admin/property/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProperty);

router.route("/properties").get(getProperties);
router.route("/admin/properties").get(getAdminProperties);
router.route("/property/:id").get(getSingleProperty);

router
  .route("/admin/property/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProperty)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProperty);

router.route("/review").put(isAuthenticatedUser, createPropertyReview);
router.route("/reviews").get(isAuthenticatedUser, getPropertyReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
