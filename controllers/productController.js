const productModel = require("../models/product");


const productcreate = (req, res) => {
  try {
    const { name, price, amount, category, description } = req.body;
    const picture = req.file ? `/Images/${req.file.filename}` : null; 
    const productregister = new productModel({
      name,
            price,
            amount,
            category,
            description,
            picture
    });
    productregister.save();
    res.status(201).json({
      success: true,
      message: "product created successfully",
      productregister,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, message: "products fetcheddd" , products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, message: " All products fetcheddd", products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const delProducts = async (req, res) => {
  try {
    const { id } = req.params; // Use 'id' here to match the route parameter
    const deletedProduct = await productModel.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: `Product with id ${id} not found` });
    }

    res.status(200).json({
      success: true,
      message: `Product with id ${id} has been deleted successfully`,
      deletedProduct,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Unable to delete product", error });
  }
};

module.exports = {
  getAllProducts,
  productcreate,
  getProducts,
  delProducts
};
