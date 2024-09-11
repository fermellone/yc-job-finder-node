import express, { NextFunction } from "express";
import { IndexController } from "../controllers";
import { HttpError, Request, Response } from "../types";

export function setRoutes(app: express.Application): void {
  const indexController = new IndexController();

  app.post("/", (req: Request, res: Response, next: NextFunction) => {
    indexController.getIndex(req, res, next);
  });

  app.get("/healthcheck", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send('Success')
  });

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpError) {
      console.error(error);
      res.json({ statusCode: error.status, error: error.message });
    } else {
      console.error(error);
      res.json({ statusCode: 500, error: "Internal Server Error" });
    }
  });
}
