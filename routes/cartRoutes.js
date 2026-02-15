const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const cartMiddleware = require('../middleware/cartMiddleware');

router.use(cartMiddleware);

router.get('/', cartController.getCart);
router.post('/add', cartController.addItem);

module.exports = router;
