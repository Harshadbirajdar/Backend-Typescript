import { Response, Request, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const requestId = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.get("X-Request-Id") || uuidv4();
  req.id = id;
  res.setHeader("X-Request-Id", id);
  next();
};

export default requestId;
