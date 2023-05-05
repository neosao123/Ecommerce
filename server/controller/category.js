const Category = require("../models/category");
const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify");

// Create Category In DB
exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log("REQ BODY", req.body);
    // const category = await new Category({name, slug: slugify(name).toLowerCase()})
    res.json(await new Category({ name, slug: slugify(name) }).save());
  } catch (err) {
    res.status(400).send("Create Category Failed");
  }
};

// Display List of Category From DB
exports.list = async (req, res, next) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }));
};

// Read the One Category From DB
exports.read = async (req, res, next) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug });

    const product = await Product.find({ category }).populate("category");

    res.json({
      category,
      product,
    });
  } catch (error) {
    console.log("ERR FROM READ ----------> ", error);
  }
};

// Update Category in DB
exports.update = async (req, res, next) => {
  const { name } = req.body;
  try {
    const update = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.send(update);
  } catch (err) {
    res.status(400).send("Category Update Failed");
  }
};

// Delete the Category from DB
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.send(err);
  }
};

exports.getSubs = async (req, res) => {
  Sub.find({ parent: req.params._id })
    .then((sub) => {
      res.send(sub);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        err: err.message,
      });
    });
};
