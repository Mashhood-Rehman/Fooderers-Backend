const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  email: String,
  password: String,
  cartData:{type:Object , default:{}}
},
{minimize:false});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
