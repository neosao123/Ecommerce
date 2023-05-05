const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create Product Failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res, next) => {
  try {
    let products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subs")
      .sort([["createAt", "desc"]]);
    res.send(products);
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
    k;
  }
};

exports.remove = async (req, res) => {
  await Product.findOneAndRemove({ slug: req.params.slug })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ data: deleted, message: "Success" });
      } else {
        res.status(404).json("Product not found");
      }
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
};

exports.read = async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs");
  res.send(product);
};

exports.update = async (req, res) => {
  try {
    console.log("PRODUCT UPDATED --->", res);
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const update = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.send(update);
  } catch (error) {
    console.log("PODUCT UPDATE ERR ---> ", error);
    return res.status(400).send("Product Update Failed.");
  }
};

// Without Pagination
// exports.list = async (req, res) => {
//   try{
//     const {sort, order, limit} = req.body
//     console.log("list Product----->", req.body)
//     const products = await Product.find({})
//     .populate('category')
//     .populate('subs')
//     .sort([[sort, order]])
//     .limit(limit)
//     console.log("limit",limit);
//     res.json(products)
//   }catch(error){
//     console.log(error);
//   }
// }

// With Pagination
exports.list = async (req, res) => {
  console.table(req.body);
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    console.log("list Product----->", req.body);
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage);
    console.log("limit", perPage);
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.productCount = async (req, res) => {
  try {
    let totalCount = await Product.find({});
    res.json(totalCount.length);
    console.log("count : ", totalCount.length);
  } catch (error) {
    console.log("ERR FROM PRODUCT COUNT: ", error);
  }
};

exports.productStar = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    console.log();
    const user = await User.findOne({ email: req.user.email });
    const { star } = req.body;
    console.log("Star Count : =====> ", star);
    console.log("user", user);

    let existingRatingObject = product.ratings.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    );

    console.log("exisitingRating: ", existingRatingObject);
    if (existingRatingObject === undefined) {
      let ratingAdded = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } },
        },
        { new: true }
      );
      console.log("ratingAdded", ratingAdded);
      res.json(ratingAdded);
    } else {
      console.log("star print count----------------->", star);
      const ratingUpdated = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      );
      console.log("RatingUpdate");
      res.json(ratingUpdated);
    }
  } catch (error) {
    console.log("ERR FROM PRODUCT Rating: ", error);
  }
};

exports.listRelated = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(3)
      .populate("category")
      .populate("subs");

    res.json(related);
  } catch (error) {
    console.log("Error in listRelated-----> ", error);
  }
};

// SEARCHING AND FILTERING

const handleQuery = async (req, res, query) => {
  try {
    const product = await Product.find({ $text: { $search: query } })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name");
    console.log("product handleQuery-----> ", product);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

exports.searchFilters = async (req, res) => {
  try {
    const { query } = req.body;
    if (query) {
      console.log("Query ------->", query);
      await handleQuery(req, res, query);
    }
  } catch (error) {
    console.log("ERR FROM serachFilters ------------>", error);
  }
};
