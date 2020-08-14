const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  offerings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Offering'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

//remains as is
