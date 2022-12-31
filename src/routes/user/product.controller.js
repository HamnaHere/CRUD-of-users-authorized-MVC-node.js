const express = require("express");
const errorHandler = require("../../middleware/error");
const product = require("../../models/product");
const { generateAuthToken } = require("../../utils/helpers");
const router = express.Router();
router.get(
    "/",
    errorHandler(async (req, res) => {
      const products = await product.find();
      res.status(200).send(products);
    })
  );
router.get(
    "/:productId",
    errorHandler(async (req, res) => {
      const product = await product.findOne({ _id: req.params.productId });
  
      res.status(200).send(product);
    })
  );
  
module.exports = router;