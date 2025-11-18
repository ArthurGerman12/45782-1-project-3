import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Vacation from "../models/Vacation";
import User from "../models/User";

const sequelize = new Sequelize({
    ...config.get('db'),
    dialect: 'mysql',
    models: [User, Vacation],
    logging: console.log
})

export default sequelize