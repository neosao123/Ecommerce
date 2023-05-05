const express = require("express");


// middleware
const { authCheck, adminCheck } = require('../middlewares/auth')

// controller
const { createOrUpdateUser } = require("../controller/auth")
const { currentUser } = require('../controller/auth');

// access router
const router = express.Router();


const myMiddleware = (req, res, next) => {
    console.log("Middle Part is Runnning");
    next();
}

router.get("/create-update-user", authCheck, createOrUpdateUser);
router.get("/user-current", authCheck, currentUser);
router.get("/admin-current", authCheck, adminCheck, currentUser);


router.get('/testing', myMiddleware, (req, res) => {
    res.send(`<h3> Successfully Tried Middleware </h3>`)
});

// export router
module.exports = router;