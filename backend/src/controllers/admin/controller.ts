import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/Vacation";
import User from "../../models/User";
import vacationIncludes from "../common/vacation-includes";
import sequelize from "../../db/sequelize";

const imageBaseUrl = process.env.PUBLIC_IMAGE_BASE_URL || "http://localhost:3000";

function buildImageUrl(image?: string) {
    if (!image) return undefined;
    if (image.startsWith("http")) return image;
    return `${imageBaseUrl}/images/${image}`;
}

export async function deleteVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const { vacationId } = req.params
        const deletedRows = await Vacation.destroy({ where: { vacationId } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        res.json({ success: true })
    } catch (e) {
        next(e)
    }
}

export async function createVacation(req: Request, res: Response, next: NextFunction) {
    try {
        const image = buildImageUrl(req.body.image);

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const vacation = await Vacation.create({
            ...req.body,
            userId: req.userId,
            image // <-- write into the correct DB column
        });

        await vacation.reload(vacationIncludes);

        res.status(201).json(vacation);

    } catch (err) {
        next(err);
    }
}

export async function getVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    try {
        const vacation = await Vacation.findByPk(req.params.vacationId, vacationIncludes)
        res.json(vacation)
    } catch (e) {
        next(e)
    }
}

export async function getReports(req, res, next) {
    try {
        const report = await Vacation.findAll({
            attributes: [
                "destination",
                [sequelize.fn("COUNT", sequelize.col("users.id")), "followers"]
            ],
            include: [
                {
                    model: User,
                    attributes: [],
                    through: { attributes: [] } // hide join table
                }
            ],
            group: ["Vacation.vacation_id"],
            order: [["destination", "ASC"]]
        });

        res.json(report);
    } catch (err) {
        console.error("REPORT ERROR:", err);
        next(err);
    }

};


export async function updateVacation(req: Request<{ vacationId: string }>, res: Response, next: NextFunction) {
    
  try {
    const vacation = await Vacation.findByPk(req.params.vacationId, vacationIncludes);

    if (!vacation) {
      return res.status(404).json({ message: "Vacation not found" });
    }
    console.log("REQ BODY:", req.body);
    console.log("startDate type:", typeof req.body.startDate, req.body.startDate);
    console.log("endDate type:", typeof req.body.endDate, req.body.endDate);

    const { destination, description, startDate, endDate, price, image } = req.body;


    vacation.destination = destination ?? vacation.destination;
    vacation.description = description ?? vacation.description;
    vacation.startDate = startDate ? new Date(startDate) : vacation.startDate;
    vacation.endDate   = endDate   ? new Date(endDate)   : vacation.endDate;
    vacation.price = price ?? vacation.price;

    const newImage = buildImageUrl(image);
    vacation.image = newImage ?? vacation.image;



    await vacation.save();

    const updated = await Vacation.findByPk(req.params.vacationId, vacationIncludes);

    res.json(updated);

  } catch (e) {
    next(e);
  }
}
