// import user
const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  ); //new:true for update the info

  if (user) {
    // existing user update
    console.log("User Updated : ", user);
    res.json(user);
  } else {
    // Creating User
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log("User Created : ", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  console.log("requested", req.user.email);
  User.findOne({ email: req.user.email })
  .then((user) => {
    res.send(user);
  })
  .catch();
};
