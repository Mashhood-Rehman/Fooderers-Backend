const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator = require("validator")


//JWT
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
}

    // <--------------------SignUp-------------->
const usercreate = async (req, res) => {
    const hashpassword = await bcrypt.hash(req.body.password, 12)
    const {email,password} = req.body
  try {
    const exists = await userModel.findOne({email})
    if(exists){
      return res.json({success:false , message : "user Already exists" })
    }
    if(!validator.isEmail(email)){
      return res.json({success:false , message : "Enter Valid Email " })
    } if(password.length < 6) {
      return res.json({success:false , message : " Enter a strong passsword" })
    }
    const userregister = new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: email,
      password: hashpassword,
    });
   const User =  await userregister.save();
   const token = createToken(User._id)
   res.json({success:true , token})
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      userregister,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


 
    // <---------------login---------------->
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(400).json({ message: "all fields required" });
    }
    const user = await userModel.findOne({ email });
    
    
    if (!user) {
      return res.status(600).json({ message: "No such User" });
    }
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) {
      return res.status(400).json({ message: " password invalid " });
    }


    const token = createToken(user._id)
    res.json({success:true , token})


    // return res.status(200).json({
    //   success: true,
    //   data: user,
    // });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// <----------------Fetching All Users -------------------->
const getUser = async (req,res) => {
  try {
  const AllUsers = await userModel.find() 
  
  res.status(200).json({success:true , msg : "All Users fetched" , AllUsers})
} 
catch (error) {
  res.status(400).json({success:false , msg: "error fetching" , error : error})
}


}




//  <--------------------------Delete User-------------------->
const delUser = async (req,res) => {
 try {
  
  const {id} = req.params
   const delid = await userModel.findByIdAndDelete(id)
   res.status(200).json({
    success:true ,
     message:`id ${id} has been deleted successfully` ,
      delid
    })
 } catch (error) {
   
   res.status(400).json({
    success:false ,
     message:'error deleting user',
     error:error})
}
 
}

module.exports = { usercreate, login , getUser, delUser };
