import { FindOptions } from "sequelize";
import Room from "../../models/room.model";

// Create a Room
const createRoom = async (roomData: Omit<Room, "id">) => {
    try {
        await Room.create(roomData);
        return await getRooms();
    } catch (error) {
        console.error(error);
    }
};

// Get a User
const getRooms = async () => {
    try {
        const rooms = await Room.findAll();
        return rooms;
    } catch (error) {
        console.error(error);
    }
};

// Get a Room
const getRoom = async (filter: FindOptions) => {
    try {
        const room = await Room.findOne(filter);
        return room;
    } catch (error) {
        console.error(error);
    }
};

// Get a Room
const deleteRoom = (owner: string, room_id: string): void => {
    try {
        Room.destroy({
            where: {
                owner: owner,
                id: room_id
            }
        })
    } catch (error) {
        console.error(error);
    }
};

const roomDbModule = {
    createRoom,
    getRooms,
    getRoom,
    deleteRoom,
};

export default roomDbModule;
