import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/Vacation";
import User from "../../models/User";

export async function getFeed(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            include: [
                {
                    model: User, // followers
                    attributes: ["id"], // optional: limit user fields
                    through: { attributes: [] } // hide join table columns
                }
            ]
        });

        res.json(vacations);
    } catch (e) {
        next(e);
    }
}
