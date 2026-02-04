const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    user: {
      name: String,
      email: String,
    },

    
    products: [
      {
        name: String,
        price: Number,
        amount: Number,  
        unit: String,     
      },
    ],

    totalAmount: Number,

    
    status: {
      type: String,
      default: "placed",
    },

    paymentStatus: {
      type: String,
      default: "PAID (MOCK)",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
