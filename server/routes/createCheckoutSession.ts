import { Request, Response } from "express";

export async function createCheckoutSession(req: Request, res: Response) {
  try {
    console.log(req.body);
    console.log(req.headers["uid"]);

    res.status(200).json({ message: "cool!" });
  } catch (err) {
    console.log("Unexpected error ocurred while purchasing course", err);
    res.status(500).json({ error: "Could not initiate Stripe checkout session" });
  }
}
