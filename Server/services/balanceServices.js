const userModel = require("../models/userModel");
const balanceModel = require("../models/balanceModel");
const error = require("../common/error");
const exceptions = require("../common/exceptions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");



const getAllService = async () => {

    const balance = await balanceModel.findAll({
  
    });
    // const usuarios = await userModel.findAll({condition,email})
    console.log(" balance return :" + balance);
    return balance;
  };




  const create = async (decode, dataBody)=>{

    const data = {
      userId: decode.userId,
      concept:dataBody.concept,
      income:dataBody.income || null,
      expenses: dataBody.expenses || null,
      operationType: dataBody.operationType,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    console.log(data);

    try {
      return await balanceModel.create(data);
    } catch (e) {
      const errorMessage = `Create Operation - Detail: ` + e.message;
      console.error("Operation - ERROR" );
      throw new error.AppError(
        exceptions.exceptionType.database.entity.canNotBeCreated,
        errorMessage
      );
    }
      
  };


  
  const getByIncome = async (operationType, userId)=>{



    
    
    const incomeBalance = await balanceModel.findAll({
      where: {
        userId: userId,
        operationType: operationType

      }
    });
    return incomeBalance;

  };


  const getByExpense = async (operationType, userId)=>{



    
    const expenseBalance = await balanceModel.findAll({
      where: {
        userId: userId,
        operationType: operationType

      }
    });
    return expenseBalance;

  };

  const deleteOperation = async (entryId, userId)=>{



    ///console.log(entryId)
    
    const deleteOpertion = await balanceModel.destroy({
      where: {
        entryId: entryId,
        userId: userId
      }
    });
    return deleteOpertion;

  };


  const updateOperation = async (decode, dataBody)=>{
    const data = {
      entryId:dataBody.entryId,
      userId: decode.userId,
      income:dataBody.income || null,
      expenses: dataBody.expenses || null,
      concept:dataBody.concept,
      updatedAt: new Date()

    }
    const byEntry = await getByentryId(dataBody.entryId);
    try {
      return await balanceModel.update(data,  
        { returning: true,
        where: {
          entryId: dataBody.entryId,
          userId: decode.userId
        }
      });
    } catch (e) {
      const errorMessage = `edit Operation - Detail: ` + e.message;
      console.error("Operation - ERROR" );
      throw new error.AppError(
        exceptions.exceptionType.database.entity.canNotBeCreated,
        errorMessage
      );
    }
      
  };

  const getByentryId = async (entryId)=>{

    const byEntry = await balanceModel.findAll({
      where: {
        entryId: entryId
      }
    });
    console.log("by entry: "  + JSON.stringify(byEntry));
    return byEntry;

  };

  module.exports = {
    getAllService,
    create,
    getByIncome,
    getByExpense,
    deleteOperation,
    updateOperation
  }
    


