const express = require("express");
const Razorpay = require("razorpay");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi");
});

app.post("/order", async (req, res) => {
  const amount = req.body.amount;

  var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });

  const options = {
    amount: amount * 100, // amount is the smallest currency unit
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  };

  const myOrder = await instance.orders.create(options);

  res.status(201).json({
    success: true,
    amount,
    order: myOrder
  });
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`));
