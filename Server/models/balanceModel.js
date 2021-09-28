const Sequelize = require('sequelize');
const {sequelizeConnection} = require('../config/server/sequelizeConfig')

const  BalanceModel = sequelizeConnection.define(
    'Balance',
{
    entryId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        fields: 'userId'
    },
    income: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        fields: 'income'
      },
      expenses: {
        type:Sequelize.DOUBLE,
        allowNull: true,
        fields: 'expenses'
      },
      operationType:{
        type:Sequelize.INTEGER,
        allowNull: false,
        fields: 'operationType'
      },
      createdAt:{
        type:Sequelize.DATE,
        fields: 'createdAt'
      },
      updatedAt:{
        type:Sequelize.DATE,
        fields: 'updatedAt'
      }
},
{
    tableName:'balances',
    timestamps: true
}
)

module.exports = BalanceModel
