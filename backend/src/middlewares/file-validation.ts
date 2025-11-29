import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function fileValidation(validator: ObjectSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        return next();
      }
      req.files = await validator.validateAsync(req.files);

      next();
    } catch (e: any) {
      next({
        status: 422,
        message: e.message,
      });
    }
  };
}
