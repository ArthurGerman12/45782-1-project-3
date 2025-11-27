import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import s3Client from "../aws/aws";
import config from "config";
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { extname } from "path";

declare global {
  namespace Express {
    interface Request {
      imageUrl?: string;
    }
  }
}

export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.files || !req.files.image) return next();

    const file = req.files.image as UploadedFile;
    const bucket = config.get<string>("s3.bucket");

    const key = `${randomUUID()}${extname(file.name)}`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucket,
        Key: key,
        ContentType: file.mimetype,
        Body: file.data
      }
    });

    await upload.done();

    // LOCALSTACK URL FORMAT
    req.imageUrl = `http://localhost:4566/${bucket}/${key}`;

    return next();
  } catch (err) {
    console.error("FILE UPLOAD ERROR:", err);
    return next(err);
  }
}
