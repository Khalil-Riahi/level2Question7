const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    cartId: {
      type: String,
      required: true,
      unique: true
    },
    items: [
      {
        productId: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

// TTL index (auto delete after 7 days of inactivity)
cartSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 604800 } // 7 days
);

module.exports = mongoose.model('Cart', cartSchema);
