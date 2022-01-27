import express, { Application, Request, Response } from "express";

export function initServer() {
  const bodyParser = require("body-parser");
  const app: Application = express();

  app.route("/").get((req, res) => res.status(200).send("<h1>API up and running!</h1>"));

  app.route("/test").get((req: Request, res: Response) => {
    res.json({ message: `get request works!` });
  });

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`server running! Listening to port:${PORT}`);
  });
}
