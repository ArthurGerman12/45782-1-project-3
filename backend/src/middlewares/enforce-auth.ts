import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from 'config'
import User from "../models/User";
import Joi from "joi";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
      userId?: string;
    }
  }
}

export default function enforceAuth(req: Request, res: Response, next: NextFunction) {
  const jwtSecret = config.get<string>("app.jwtSecret");

  const authHeader = req.get("Authorization");
  if (!authHeader) return next({ status: 401, message: "missing Authorization header" });

  if (!authHeader.startsWith("Bearer"))
    return next({ status: 401, message: "missing Bearer keyword" });

  const jwt = authHeader.split(" ")[1];
  if (!jwt) return next({ status: 401, message: "missing jwt" });

  try {
    const user = verify(jwt, jwtSecret) as any;

    req.userId = user.id;
    req.user = {
      id: user.id,
      role: user.role
    };

    next();
  } catch (e) {
    next({ status: 401, message: "invalid jwt" });
  }
}
