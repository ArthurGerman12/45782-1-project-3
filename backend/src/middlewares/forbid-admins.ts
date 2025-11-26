import "express"; // ensures augmentation is loaded
import { Request, Response, NextFunction } from "express";

export function forbidAdmins(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role === "admin") {
    return res.status(403).json({ message: "Admins cannot perform this action" });
  }
  next();
}
