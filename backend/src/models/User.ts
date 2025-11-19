import { AllowNull, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import Vacation from "./Vacation";
import Follow from "./Follow";

@Table({
    underscored: true
})
export default class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    firstName: string;
    
    @Default('user')
    @Column(DataType.ENUM('user', 'admin'))
    role: 'user' | 'admin';
    
    @AllowNull(false)
    @Column(DataType.STRING)
    lastName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @BelongsToMany(() => Vacation, () => Follow)
    vacations!: Vacation[];

}
