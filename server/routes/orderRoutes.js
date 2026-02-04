const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();



router.post("/create", auth, async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const order = await Order.create({
      userId: req.userId,
      user,
      products,
      totalAmount,
      paymentStatus: "PAID (MOCK)",
      status: "placed",
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
});


router.get("/my-orders", auth, async (req, res) => {
  const orders = await Order.find({
    userId: req.userId,
  }).sort({ createdAt: -1 });

  res.json(orders);
});


router.get("/all", auth, admin, async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 });

  res.json(orders);
});




router.put("/:id/status", auth, async (req, res) => {
  try {
    if (req.role !== "admin") {
      return res.status(403).json({
        message: "Admin only",
      });
    }

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Status update failed",
    });
  }
});


router.get("/all", auth, async (req, res) => {
  try {
   
    if (req.role !== "admin") {
      return res.status(403).json({
        message: "Admin only",
      });
    }

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});


module.exports = router;
