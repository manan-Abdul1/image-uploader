const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

// POST route for user registration
router.post('/register', upload.single('avatar'), userController.register);

// GET route for retrieving user image
router.get('/image/:email', userController.getImage)

module.exports = router;
