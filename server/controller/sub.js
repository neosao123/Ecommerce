const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

// Create Category In DB
exports.create = async (req, res, next) => {
  try {
    const { name, parent } = req.body;
    // const category = await new Category({name, slug: slugify(name).toLowerCase()})
    res.json(await new Sub({ name, parent, slug: slugify(name) }).save());
  } catch (err) {
    res.status(400).send("Create Sub Failed");
  }
};

// Display List of Category From DB
exports.list = async (req, res, next) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }));
};

// Read the One Category From DB
exports.read = async (req, res, next) => {
  try {
    let subs = await Sub.findOne({ slug: req.params.slug });
    const product = await Product.find({ subs }).populate("category");

    res.json({
      subs,
      product,
    });
  } catch (error) {
    console.log("ERR FROM READ SUB-------------->", error);
  }
};

// Update Category in DB
exports.update = async (req, res, next) => {
  const { name, parent } = req.body;
  try {
    const update = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.send(update);
  } catch (err) {
    console.log(err);
    res.status(400).send("Sub Update Failed");
  }
};

// Delete the Sub from DB
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.send(err);
  }
};
