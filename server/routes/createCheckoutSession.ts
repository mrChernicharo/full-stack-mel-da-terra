import { Request, Response } from "express";
import { db, getDocData } from "../firebase/database";
import { Timestamp } from "@google-cloud/firestore";

interface RequestData {
  orderItems: { productId: string; quantity: string }[];
  callbackUrl: string;
  userId: string;
}

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    console.log(req.body);
    console.log(req["uid"]);

    const reqData: RequestData = {
      orderItems: req.body.order,
      callbackUrl: req.body.callbackUrl,
      userId: <string>req["uid"],
    };

    if (!reqData.userId) {
      const message = "User must be Authenticated!";
      console.log(message);
      res.status(403).json({ message });
      return;
    }

    const purchaseSession = await db.collection("purchaseSessions").doc();
    const checkoutSessionData: any = {
      status: "ongoing",
      createdAt: Timestamp.now(),
      userId: reqData.userId,
    };

    if (reqData.orderItems.length) {
      checkoutSessionData.items = reqData.orderItems;
    }

    await purchaseSession.set(checkoutSessionData);

    const user = await getDocData(`users/${reqData.userId}`);

    console.log({ reqData, user, purchaseSession, checkoutSessionData });

    res.status(200).json({ message: "cool!" });
  } catch (err) {
    console.log("Unexpected error ocurred while purchasing course", err);
    res.status(500).json({ error: "Could not initiate Stripe checkout session" });
  }
}
