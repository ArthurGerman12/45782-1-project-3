import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";
import Vacation from "./Vacation";

@Table({
    underscored: true
})
export default class Follow extends Model {

    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;       // the follower user

    @PrimaryKey
    @ForeignKey(() => Vacation)
    @Column(DataType.UUID)
    vacationId: string;   // the vacation they follow
}
