import "express"; // ensures augmentation is loaded
import { Request, Response, NextFunction } from "express";

export default function requireRole(role: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
