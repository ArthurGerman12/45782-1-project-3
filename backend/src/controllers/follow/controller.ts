import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import Follow from "../../models/Follow";
import Vacation from "../../models/Vacation";


export async function follow(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {

        const existing = await Follow.findOne({
            where: {
                userId: req.userId,
                vacationId: req.params.id
            }
        })

        if (existing) throw new Error('follow already exists')

        const follow = await Follow.create({
            userId: req.userId,
            vacationId: req.params.id
        })
        res.json(follow)

        const vacation = (await User.findByPk(req.params.id)).get({plain: true})
        const user = (await User.findByPk(req.userId)).get({plain: true})

    } catch (e) {
        if (e.message === 'follow already exists') return next({
            status: 422,
            message: e.message
        })
        next(e)
    }
}

export async function getVacations(req: Request, res: Response, next: NextFunction) {
    try {

        const { vacations } = await User.findByPk(req.userId, {
            include: [{
                model: Vacation,
                as: 'vacations'
            }]
        })

        res.json(vacations)

    } catch (e) {
        next(e)
    }
}

export async function unfollow(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const follow = await Follow.findOne({
            where: {
                userId: req.userId,
                vacationId: req.params.id
            }
        })
        if (!follow) throw new Error('vacation not found')
        await follow.destroy()
        res.json({
            success: true
        })
    } catch (e) {
        console.log(e)
        if (e.message === 'vacation not found') return next({
            status: 422,
            message: 'vacation not found'
        })
        next(e)
    }
}