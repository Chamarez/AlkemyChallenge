const Sequelize = require('sequelize');
const {sequelizeConnection} = require('../config/server/sequelizeConfig')

const  UserModel = sequelizeConnection.define(
    'Users',
{
    userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        fields: 'username'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        fields: 'password'
      },
      email: {
        type:Sequelize.STRING,
        allowNull: true,
        fields: 'email'
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
    tableName:'users',
    timestamps: true
}
)

module.exports = UserModel
