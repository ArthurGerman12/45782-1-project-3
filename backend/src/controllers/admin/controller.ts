import { NextFunction, Request, Response } from "express";
import Vacation from "../../models/Vacation";
import User from "../../models/User";
import { newPostValidator } from "./validation";
import socket from "../../io/io";
import SocketMessages from "socket-enums-shaharsolllllll";
import vacationIncludes from "../common/vacation-includes";


export async function deletePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const deletedRows = await Vacation.destroy({ where: { id } })
        if (deletedRows === 0) return next({
            status: 404,
            message: 'yo bro, da racord u wana dalete as not yar'
        })
        res.json({ success: true })
    } catch (e) {
        next(e)
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction) {

    try {
        const newVacation = await Vacation.create({ 
            ...req.body, 
            userId: req.userId, 
            imageUrl: req.imageUrl 
        })
        await newVacation.reload(vacationIncludes)
        res.json(newVacation)

        /////////////////////////////// here i want to send the io server a message
        // socket.emit(SocketMessages.newVacation, {
        //     from: req.get('x-client-id') || 'stam',
        //     post: newVacation
        // })

    } catch (e) {
        next(e)
    }
}

export async function updatePost(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
        const vacation = await Vacation.findByPk(req.params.id, vacationIncludes);
        const { destination, description, startDate, endDate, price, image  } = req.body
        vacation.destination = destination
        vacation.description = description
        vacation.startDate = startDate
        vacation.endDate = endDate
        vacation.price = price
        vacation.image = image
        await vacation.save()
        res.json(vacation)
    } catch (e) {
        next(e)
    }
}