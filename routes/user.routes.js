const catchErrors = require('../middlewares/catchErrors')
const Enums = require('../models/enums')
const authorize = require('../middlewares/auth')
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const { USER, ADMIN } = Enums.ROLES

router.post('/login', catchErrors(userController.login));
router.post('/signup', catchErrors(userController.signup));


module.exports = router;