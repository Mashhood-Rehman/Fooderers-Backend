const express = require("express");
const router = express.Router();
const { usercreate, login , getUser , delUser } = require("../controllers/userController");
router.post("/usercreate", usercreate);
router.post("/login", login);
router.get("/getUser",getUser);    
router.delete("/delUser/:id",delUser);    
module.exports = router;
