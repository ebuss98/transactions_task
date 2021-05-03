'use strict';
import {
  DataTypes, Model, Sequelize,
} from 'sequelize'


  class Transaction extends Model {
    public id!: number;
    public from_address!: string;
    public to_address!: string;
    public value!: number;
    public block_number!: number;
    public static initialize(sequelize: Sequelize) {
    this.init({
                       from_address: DataTypes.STRING,
                       to_address: DataTypes.STRING,
                       value: DataTypes.FLOAT,
                       id:  {
                           type: DataTypes.INTEGER,
                           primaryKey: true,
                           autoIncrement: true
                       },
                       block_number: DataTypes.INTEGER
                     }, { timestamps: false,
        sequelize });
  }
};
export default Transaction
