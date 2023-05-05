const express = require('express');

// access routers
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth')

// controller
const { upload, remove } = require('../controller/cloudinary')


// routes
router.post('/uploadimage', authCheck, adminCheck, upload)
router.post('/removeimage', authCheck, adminCheck, remove)

// export

module.exports = router;
