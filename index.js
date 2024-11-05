require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser")
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const path = require('path');

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, '../frontend/src/Images')));





const router = require("./routes/productroute");
const route = require("./routes/userRoute");
const orderRouter  =require("./routes/orderRoute")



const stripe = require("stripe") ("sk_test_51PkqrUAusfi4SBU0ognZMrzTK9eJhstHcg0vKdqXIc2zS8RdEQMZuhNjhPlquk99TBHrfEto8FsmFZB9LS4PRCzC00sXgmu7lD")












mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("the db is running successfully"))
  .catch((err) => console.log(err));




  app.use("/", route);
  app.use("/", router);
app.use("/", orderRouter)
app.post("/create-checkout-sessions", async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name ,
                },
        unit_amount: item.price*100 ,
      },
      quantity: item.quantity 
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/dispatch",
      cancel_url: "http://localhost:3000/cancel"
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send(`Error creating checkout session: ${error.message}`);
  }
});



app.listen(port, () => {
  console.log("server is running on port", port);
});
