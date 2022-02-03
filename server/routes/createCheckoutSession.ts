import { Request, Response } from "express";

interface RequestData {
  orderItems: { productId: string; quantity: string }[];
  callbackUrl: string;
  userId: string;
}

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    console.log(req.body);
    console.log(req.headers["uid"]);

    const reqData: RequestData = {
      orderItems: req.body.order,
      callbackUrl: req.body.callbackUrl,
      userId: <string>req.headers["uid"],
    };

    console.log(reqData);

    res.status(200).json({ message: "cool!" });
  } catch (err) {
    console.log("Unexpected error ocurred while purchasing course", err);
    res.status(500).json({ error: "Could not initiate Stripe checkout session" });
  }
}
