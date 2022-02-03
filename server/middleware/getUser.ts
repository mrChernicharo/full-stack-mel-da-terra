import { NextFunction, Request, Response } from "express";
import { auth } from "../firebase/auth";

export async function getUseMiddleware(req: Request, res: Response, next: NextFunction) {
  const jwt = req.headers["authorization"];

  if (jwt) {
    try {
      const jwtPayload = await auth.verifyIdToken(jwt);
      // console.log({ jwtPayload });

      req["uid"] = jwtPayload.uid;

      next();
      //
    } catch (err) {
      //
      const message = `Error verifying Firebase Id token`;
      console.log(message, err);

      res.status(403).json({ message });
    }
  } else {
    next();
  }
}
