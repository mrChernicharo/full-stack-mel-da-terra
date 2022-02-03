import express, { Application, Request, Response } from "express";
import { db, getAllFromCollection, getDocData } from "./database";
import { produtosImgUrls } from "./img-urls";
import { createCheckoutSession } from "./routes/checkout";
const cors = require("cors");

export function initServer() {
  const bodyParser = require("body-parser");
  const app: Application = express();
  app.use(cors());

  app.route("/").get((req, res) => res.status(200).send("<h1>API is up and running!</h1>"));

  app.route("/test").get((req: Request, res: Response) => {
    console.log("get request working!");
    res.json({ message: `get request works!` });
  });

  app.route("/add").get(async (req: Request, res: Response) => {
    try {
      const products = [
        {
          nome: "kit degustação",
          pote: "kit",
          valor: 4000,
          imgPath: produtosImgUrls["kit"],
        },
        {
          nome: "pote de 150g",
          pote: "150",
          valor: 1800,
          imgPath: produtosImgUrls["150"],
        },
        {
          nome: "pote de 350g",
          pote: "350",
          valor: 2800,
          imgPath: produtosImgUrls["350"],
        },
        {
          nome: "pote de 480g",
          pote: "480",
          valor: 3500,
          imgPath: produtosImgUrls["480"],
        },
        {
          nome: "pote de 780g",
          pote: "780",
          valor: 4800,
          imgPath: produtosImgUrls["780"],
        },
      ];

      const productsCollection = db.collection("products");

      for (let product of products) {
        await productsCollection.add(product);
        console.log(product);
      }

      res.json({ products });
    } catch (err) {
      res.status(404).send(err);
    }
  });

  app.route("/products").get(async (req, res) => {
    const prods = await getAllFromCollection("products");
    res.json(prods);
  });

  app.route("/checkout").post(bodyParser.json(), createCheckoutSession);

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`server running! Listening to port:${PORT}`);
  });
}
