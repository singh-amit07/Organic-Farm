const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();



router.post("/", auth, admin, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});



router.put("/:id", auth, admin, async (req, res) => {
  const p = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(p);
});



router.delete("/:id", auth, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
