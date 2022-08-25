require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const app = express();

const PORT = process.env.PORT || 3000;
const key_id = process.env.key_id;
const key_secret = process.env.key_secret;

app.use(express.json());
app.use(express.static("./public"));

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({ key_id, key_secret });

  const options = {
    amount: amount * 100, // amount is the smallest currency unit
    currency: "INR",
    receipt: "receipt#1",
  };

  const myOrder = await instance.orders.create(options);

  res.status(201).json({
    success: true,
    amount,
    order: myOrder,
  });
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`));
