const express = require("express");

// access router
const router = express.Router();

router.get("/user", (req, res) => {
    res.send(`<h3> User </h3>`);
});


module.exports = router;