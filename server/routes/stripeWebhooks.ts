import { Request, Response } from "express";
import { getDocData } from "../firebase/database";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function stripeWebhooks(req: Request, res: Response) {
  try {
    const signature = req.headers["stripe-signature"];
    console.log({ signature, body: req.body });

    const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    console.log(event);

    // we've been contacted by stripe with the confirmation that the purchase was completed
    if (event.type == "checkout.session.completed") {
      const session = event.data.object;
      console.log(session);
      await onCheckoutSessionCompleted(session);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.log(`Error processing webhook event, reason: ${err}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}

async function onCheckoutSessionCompleted(session) {
  console.log(session);
  const purchaseSessionId = session.client_reference_id;

  const purchaseSession = await getDocData(`purchaseSessions/${purchaseSessionId}`);

  console.log(purchaseSession);
}
