'use strict';

import { Options, Sequelize } from 'sequelize'
import Transaction from "./transaction";
const env = process.env.NODE_ENV || 'development';
import configs from '../config/config.json'
const config = configs[env]

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    <Options> config,
);

let models = [Transaction]
models.forEach(model => model.initialize(sequelize))
sequelize.sync()

export {
  sequelize as Database,
  Transaction
}
