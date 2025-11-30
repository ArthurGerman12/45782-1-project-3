import { Upload } from "@aws-sdk/lib-storage";
import s3Client from "./aws";
import config from "config";
import * as fs from "fs";
import * as path from "path";

export async function seedInitialImages() {
    const bucket = config.get<string>("s3.bucket");
    const seedFolder = path.join(__dirname, "..", "..", "seed-images");


    if (!fs.existsSync(seedFolder)) {
        console.log("No seed-images folder found. Skipping image seeding.");
        return;
    }

    const files = fs.readdirSync(seedFolder);

    if (files.length === 0) {
        console.log("seed-images folder is empty. Skipping.");
        return;
    }

    console.log("Seeding images into S3 bucket:", bucket);

    for (const file of files) {
        const filePath = path.join(seedFolder, file);
        const fileStream = fs.readFileSync(filePath);

        try {
            const upload = new Upload({
                client: s3Client,
                params: {
                    Bucket: bucket,
                    Key: file,
                    Body: fileStream,
                    ContentType: "image/jpeg",
                    ACL: "public-read"
                }
            });

            await upload.done();
            console.log("Seeded:", file);
        } catch (err) {
            console.error("Failed to seed", file, err);
        }
    }

    console.log("Image seeding complete.");
}
