const express = require("express");

// middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,
  getSubs
} = require("../controller/category");

// access router
const router = express.Router();

router.post("/category", create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/sub/:_id", getSubs);

// export router
module.exports = router;
