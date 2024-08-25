const express = require("express")
const {placeOrder} = require("../controllers/orderController")
const orderRouter = express.Router()
orderRouter.post("/place", placeOrder)
module.exports = orderRouter