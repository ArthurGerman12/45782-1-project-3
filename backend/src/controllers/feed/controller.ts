import { NextFunction, Request, Response } from "express";
import { col, fn } from "sequelize";
import User from "../../models/User";
import Vacation from "../../models/Vacation";


export async function getFeed(req: Request, res: Response, next: NextFunction) {
    try {
        const vacations = await Vacation.findAll({
            attributes: {
                include: [
                    // Count followers without loading them into the payload
                    [fn("COUNT", fn("DISTINCT", col("users.id"))), "likesCount"]
                ]
            },
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: [],
                    through: { attributes: [] }
                }
            ],
            group: ["Vacation.vacation_id"],
            subQuery: false
        });

        res.json(vacations);
    } catch (e) {
        next(e);
    }
}
