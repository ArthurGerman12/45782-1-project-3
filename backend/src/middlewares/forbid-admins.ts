import { Response, NextFunction } from "express";
import { AuthRequest } from "./enforce-auth";

export function forbidAdmins(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role === "admin") {
    return res.status(403).json({ message: "Admins cannot perform this action" });
  }
  next();
}
