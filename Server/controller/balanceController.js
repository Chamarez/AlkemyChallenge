const userServices = require('../services/userServices');
const balanceServices = require('../services/balanceServices');
const exceptions = require('../common/exceptions');
const error= require('../common/error');
const jwt = require("jsonwebtoken");



  const create = async (req, res) => {  
    const dataBody = req.body;
    console.log("llega en el body "+JSON.stringify(dataBody));
    const dataHeader = req.header("auth");
    const decode = jwt.decode(dataHeader);
    console.log(decode)
    const newCount = await balanceServices.create(decode, dataBody);
    res.status(201).json({newCount})
   }

   const getAll = async (req,res) => {
    const balance = await balanceServices.getAllService();
    res.status(200).json(balance);
  }

  const getByIncome = async (req,res) => {
    ///const dataBody = req.body;
    const dataHeader = req.header("auth");
    const decode = jwt.decode(dataHeader);
    const userId = decode.userId;
    const operationType = 1 ///dataBody.operationType;
    

    console.log("getBy income: "+  +" " + operationType +" "+ userId);
    
    //Call userService
    const income = await balanceServices.getByIncome(operationType, userId)
    res.status(200).json(income)

  };


  const getByexpense = async (req,res) => {
    ///const dataBody = req.body;
    const dataHeader = req.header("auth");
    const decode = jwt.decode(dataHeader);
    const userId = decode.userId;
    const operationType = 0 ///dataBody.operationType;
    

    console.log("getBy income: "+  +" " + operationType +" "+ userId);
    
    //Call userService
    const expense = await balanceServices.getByIncome(operationType, userId)
    res.status(200).json(expense)

  }



  const deleteOperation = async (req,res) => {
    const dataBody = req.body;
    const dataHeader = req.header("auth");
    const decode = jwt.decode(dataHeader);
    const userId = decode.userId;
    const entryId = dataBody.entryId;
    

    console.log("From delete: "+  +" userID" + userId +" entryID"+ entryId);
    
    //Call userService
    const deleteOpertion = await balanceServices.deleteOperation(entryId, userId)
    
    if(deleteOpertion==1){
      res.status(200).json("Operation Deleted")
    }else{
      res.status(400).json("Operation dont exist")
    }

  }




  const updateOperation = async (req, res) => {  
    const dataBody = req.body;
    console.log("llega en el body "+JSON.stringify(dataBody));
    const dataHeader = req.header("auth");
    const decode = jwt.decode(dataHeader);
    console.log(decode)
    const updatedCount = await balanceServices.updateOperation(decode, dataBody);
    res.status(201).json("Operation Modified")
   }


  module.exports ={
    getAll,
    create,
    getByIncome,
    getByexpense,
    deleteOperation,
    updateOperation
  };
  