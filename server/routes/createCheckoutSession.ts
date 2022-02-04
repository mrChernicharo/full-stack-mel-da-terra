import { Request, Response } from "express";
import { db, getDocData } from "../firebase/database";
import { Timestamp } from "@google-cloud/firestore";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// interface Product {
//   nome: string;
//   pote: string;
//   valor: number;
//   imgPath: string;
// }
interface OrderItem {
  productId: string;
  quantity: number;
}
interface RequestData {
  orderItems: OrderItem[];
  callbackUrl: string;
  userId: string;
}

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    const reqData: RequestData = {
      orderItems: req.body.order,
      callbackUrl: req.body.callbackUrl,
      userId: <string>req["uid"],
    };

    const { orderItems, callbackUrl, userId } = reqData;

    if (!userId) {
      const message = "User must be Authenticated!";
      console.log(message);
      res.status(403).json({ message });
      return;
    }

    const purchaseSession = await db.collection("purchaseSessions").doc();
    const checkoutSessionData: any = {
      status: "ongoing",
      createdAt: Timestamp.now(),
      userId: userId,
    };

    if (orderItems.length) {
      checkoutSessionData.items = orderItems;
    }

    await purchaseSession.set(checkoutSessionData);

    const user = await getDocData(`users/${userId}`);

    let sessionConfig;

    if (orderItems[0].productId) {
      const promisedItems = orderItems.map((item) => getDocData(`products/${item.productId}`));
      const retrievedProducts = await Promise.all(promisedItems);

      const checkoutItems = retrievedProducts.map((product, i) => ({ quantity: orderItems[i].quantity, product }));

      sessionConfig = setupPurchaseCourseSession(
        reqData,
        checkoutItems,
        purchaseSession.id,
        user ? user.stripeCustomerId : undefined
      );
    }

    // create checkout session in stripe servers
    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log({ sessionConfig, session, line_items: sessionConfig.line_items });

    res.status(200).json({
      stripeCheckoutSessionId: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      sessionUrl: session.url,
    });
  } catch (err) {
    console.log("Unexpected error ocurred while purchasing course", err);
    res.status(500).json({ error: "Could not initiate Stripe checkout session" });
  }
}

function setupPurchaseCourseSession(info: RequestData, checkoutItems: any[], sessionId: string, stripeCustomerId: string) {
  const config = setupBaseSessionConfig(info, sessionId, stripeCustomerId);

  config.line_items = checkoutItems.map((item) => {
    const { product, quantity } = item;
    const { pote, nome, valor } = product;

    return {
      name: pote,
      description: nome,
      amount: valor,
      currency: "BRL",
      quantity: quantity,
    };
  });

  return config;
}

function setupBaseSessionConfig(info: RequestData, sessionId: string, stripeCustomerId: string) {
  const config: any = {
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${info.callbackUrl}/?purchaseResult=success&ongoingSessionId=${sessionId}`,
    cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
    client_reference_id: sessionId,
  };

  if (stripeCustomerId) {
    config.customer = stripeCustomerId;
  }

  return config;
}
