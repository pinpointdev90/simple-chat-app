import { Request, Response } from "express";
import mysqlModule from "../modules/mysql";
import User from "../models/user.model";
import roomDbModule from "../modules/mysql/room.module";
import Room from "../models/room.model";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const createRoom = async (req: Request, res: Response) => {
    try {
        const roomData: Room = req.body;

        // create room
        const room = await roomDbModule.createRoom(roomData);

        res.status(200).send({
            status: "success",
            message: "Created a room successfully!",
            room,
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

const getRooms = async (req: Request, res: Response) => {
    try {
        // get rooms
        const rooms = await roomDbModule.getRooms();

        res.status(200).send({
            status: "success",
            message: "Got room list successfully!",
            rooms,
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

const deleteRoom = async (req: Request, res: Response) => {
    try {
        const data: {
            owner: string,
            room_id: string
        } = req.body;

        // check room
        await roomDbModule.deleteRoom(data.owner, data.room_id);

        res.status(200).send({
            status: "success",
            message: "Deleted a room successfully!",
        });
    } catch (err) {
        res.status(500).send({
            status: "error",
            message: "500 Server error",
            error: (err as Error)?.message,
        });
    }
};

const roomController = {
    createRoom,
    getRooms,
    deleteRoom,
};

export default roomController;
