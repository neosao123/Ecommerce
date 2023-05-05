const express = require("express");
// access router
const router = express.Router();

// middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productCount,
  productStar,
  listRelated,
  searchFilters,
} = require("../controller/product");

router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productCount);

router.get("/products/:count", listAll); // products/100
router.delete("/products/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);
router.post("/products", list);

// rating
router.put('/product/star/:productId', authCheck, productStar)
// related
router.get('/product/related/:productId', listRelated)
// search
router.post('/search/filters', searchFilters)

// export router
module.exports = router;
