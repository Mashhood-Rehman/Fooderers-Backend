const express = require("express");
const upload = require("../multerConfig");
const {  getAllProducts,
  productcreate,
  getProducts,
  delProducts} = require("../controllers/productController")
  const router = express.Router();

  router.post("/productcreate", upload.single('picture'), productcreate);

router.get("/getProducts/:category",getProducts) 
router.get("/getAllProducts",getAllProducts)


router.delete("/deleteProducts/:id", delProducts);
module.exports = router;

// router.post("/productcreate", async (req, res) => {
//   const { category } = req.params;

//   try {
//     const product = new productModel(req.body);
//     await product.save();
//     res.status(201).json({ success: true, message: "Product added", product });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// });

// router.get("/getProducts/:category", async (req, res) => {
//   const { category } = req.params;
//   try {
//     const products = await productModel.find({ category });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message, products });
//   }
// });
// router.get("/getAllProducts", async (req, res) => {
//   try {
//     const products = await productModel.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message, products });
//   }
// });
// router.delete("/deleteProducts" , async (req,res) => {
//   try {
//     const products = await productModel.findOne()
//     res.json(products)
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message, products });
//   }
// })
// module.exports = router