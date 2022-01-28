import express, { Application, Request, Response } from "express";
import { db } from "./database";

export function initServer() {
  const bodyParser = require("body-parser");
  const app: Application = express();

  app.route("/").get((req, res) => res.status(200).send("<h1>API is up and running!</h1>"));

  app.route("/test").get((req: Request, res: Response) => {
    console.log("get request working!");
    res.json({ message: `get request works!` });
  });

  app.route("/add").get(async (req: Request, res: Response) => {
    try {
      const product = {
        name: "mel",
        price: 1900,
      };
      const productsCollection = db.collection("products");
      const productRef = await productsCollection.add(product);

      res.json({ product, id: productRef.id });
    } catch (err) {
      res.status(404).send(err);
    }
  });

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`server running! Listening to port:${PORT}`);
  });
}
