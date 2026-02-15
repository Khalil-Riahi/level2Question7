// const crypto = require('crypto');
// const Cart = require('../models/Cart');

// const cartMiddleware = async (req, res, next) => {
//   try {
//     let cartId = req.cookies.cartId;

//     if (!cartId) {
//       cartId = crypto.randomUUID();

//       res.cookie('cartId', cartId, {
//         httpOnly: true
//       });

//       await Cart.create({
//         cartId,
//         items: []
//       });
//     }

//     req.cartId = cartId;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error creating cart' });
//   }
// };

// module.exports = cartMiddleware;


const crypto = require('crypto');
const Cart = require('../models/Cart');

const cartMiddleware = async (req, res, next) => {
  try {
    let cartId = req.cookies.cartId;
    let cart;

    // If no cartId cookie → create new cart
    if (!cartId) {
      cartId = crypto.randomUUID();

      cart = await Cart.create({
        cartId,
        items: []
      });

      res.cookie('cartId', cartId, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

    } else {
      // If cookie exists → check if cart exists in DB
      cart = await Cart.findOne({ cartId });

      // If cart was deleted (TTL expired), recreate it
      if (!cart) {
        cart = await Cart.create({
          cartId,
          items: []
        });
      }
    }

    // Attach cart info to request
    req.cartId = cartId;
    req.cart = cart;

    next();

  } catch (error) {
    console.error('Cart Middleware Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to initialize cart'
    });
  }
};

module.exports = cartMiddleware;
