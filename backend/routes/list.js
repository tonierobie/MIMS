const express = require("express");
const router = express.Router();

const {
  newList,
  getSingleList,
  myLists,
  allLists,
  updateList,
  deleteList,
} = require("../controllers/listController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/list/new").post(isAuthenticatedUser, newList);
router.route("/list/:id").get(isAuthenticatedUser, getSingleList);
router.route("/lists/me").get(isAuthenticatedUser, myLists);

router
  .route("/admin/lists/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allLists);
router
  .route("/admin/list/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateList)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteList);

module.exports = router;
