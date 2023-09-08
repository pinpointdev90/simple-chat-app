import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

class User extends Model {
    public id!: number;
    public nickname!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "user", // You can change this to match your table name
    },
);

export default User;
