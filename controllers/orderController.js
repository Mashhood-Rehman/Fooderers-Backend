const orderModel = require("../models/orderModel")
const userModel = require("../models/user")
// const Stripe = require("stripe")
// const stripe = require("stripe") ("sk_test_51PkqrUAusfi4SBU0ognZMrzTK9eJhstHcg0vKdqXIc2zS8RdEQMZuhNjhPlquk99TBHrfEto8FsmFZB9LS4PRCzC00sXgmu7lD")

// const stripe = new Stripe(process.env.Stripe_SECRET_KEY)
//placing order for  frontend
const placeOrder =  async (req, res) => {
try {
    const newOrder = new orderModel({
        userId: req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
         address:req.body.address
    })
    await newOrder.save()
    // await userModel.findByIdAndUpdate(req.body.userId,{ cartData:{}})
    // const line_items = req.body.items.map((item) => ({
    //     price_data: {
    //       currency: "usd",
    //       product_data: {
    //         name: item.name,
    //         // Image: [item.picture] // Uncomment if you want to include the image
    //       },
    //       unit_amount: item.price* 100  ,

    //     },
    //     quantity: item.quantity
    //   }));
    //   line_items.push({
    //         price_data:{
    //     currency: "usd",
    //             product_data: {
    //                 name: 'Delivery Charges'
    //             },
    //             unit_amount: 2 * 100 *80 ,
    //         },
    //         quantity:1
    //   })
    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ["card"],
    //           line_items: line_items,
    //           mode: "payment",
    //           success_url: "http://localhost:5173/dispatch",
    //           cancel_url: "http://localhost:3000/cancel"
    //   })
    //   res.json({success:true , session_url:session_url})
      
} catch (error) {
    console.log(error)
    res.json({success:false , message:("error" , error)})
}
}
module.exports = {placeOrder}