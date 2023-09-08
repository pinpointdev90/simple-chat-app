import express from "express";
import validateRequest from "../middleware/validateRequest";
import roomController from "../controllers/room.controller";

const router = express.Router();

router.post(`/rooms`, [
    validateRequest.validateRequestBody(["room", "owner"]),
    roomController.createRoom,
]);

router.get(`/rooms`, roomController.getRooms);

router.delete(`/rooms`, [
    validateRequest.validateRequestBody(["room_id", "owner"]),
    roomController.deleteRoom,
]);

export default router;
