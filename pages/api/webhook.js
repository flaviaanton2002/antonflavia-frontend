import { mongooseConnect } from "@/lib/mongoose";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret =
  "whsec_a6b742d0d31dbcbd7f4e126532be342dea448adbbcf2c4784f9d05404efd1cea";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log(event.type);
  // Handle the event
  switch (event.type) {
    case "checkout.session.succeeded":
      const paymentIntentSucceeded = event.data.object;
      console.log("esti fraiera");
      console.log(paymentIntentSucceeded);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

export const config = {
  api: { bodyParser: false },
};

//virtue-nifty-excel-zeal
//acct_1NF2s7LqYOYgoptV
