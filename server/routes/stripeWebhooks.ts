import { Request, Response } from "express";
import { db, getDocData } from "../firebase/database";
import { Timestamp } from "@google-cloud/firestore";
import { randomBytes } from "crypto";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function stripeWebhooks(req: Request, res: Response) {
  try {
    const signature = req.headers["stripe-signature"];

    const event = await stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    // we've been contacted by stripe with the confirmation that the purchase was completed
    if (event.type == "checkout.session.completed") {
      const session = event.data.object;
      await onCheckoutSessionCompleted(session);
    }

    res.status(200).json({ received: true });
    //
  } catch (err) {
    console.log(`Error processing webhook event, reason: ${err}`);
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }
}

async function onCheckoutSessionCompleted(session) {
  const purchaseSessionId = session.client_reference_id;

  const purchaseSession = await getDocData(`purchaseSessions/${purchaseSessionId}`);
  console.log("purchase session", purchaseSession);

  const { userId, items } = purchaseSession;

  if (items.length) {
    await fulfillCoursePurchase(userId, items, purchaseSessionId, session.customer);
  }
}

async function fulfillCoursePurchase(userId: string, items: any[], purchaseSessionId: string, stripeCustomerId: string) {
  const batch = db.batch();

  const purchaseSessionRef = db.doc(`purchaseSessions/${purchaseSessionId}`);
  batch.update(purchaseSessionRef, { status: "completed" });

  const firestorePurchaseId = randomBytes(12).toString("base64");
  const productsPromise = items.map((item) => getDocData(`products/${item.productId}`));
  const retrievedProducts = await Promise.all(productsPromise);
  const purchaseItems = retrievedProducts.map((item, i) => ({
    product: item.nome,
    value: item.valor,
    quantity: items[i].quantity,
  }));

  const purchaseData = {
    purchaseItems,
    total: purchaseItems.reduce((acc, item) => (acc += item.value * item.quantity), 0),
    timestamp: Timestamp.now(),
  };
  const userPurchasesRef = db.doc(`users/${userId}/purchases/${firestorePurchaseId}`);
  batch.create(userPurchasesRef, purchaseData);

  const userRef = db.doc(`users/${userId}`);
  batch.set(userRef, { stripeCustomerId }, { merge: true }); // this might doc exist or not

  return batch.commit();
}
