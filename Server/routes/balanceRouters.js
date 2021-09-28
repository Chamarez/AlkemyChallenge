const express = require('express');
const router = express.Router();
const routeController = require("../common/routeController");
const balanceController = require ("../controller/balanceController");


router.get("/",(req, res,)=> {
    routeController.handleRequest(req, res, balanceController.getAll);
  });

router.post("/balance",(req, res,)=> {
    routeController.handleRequest(req, res, balanceController.create);
  });


router.get("/income",(req, res,)=> {
    routeController.handleRequest(req, res, balanceController.getByIncome);
  });

  router.get("/expense",(req, res,)=> {
    routeController.handleRequest(req, res, balanceController.getByexpense);
  });

  router.delete("/delete",(req, res,)=> {
    routeController.handleRequest(req, res,balanceController.deleteOperation);
  });

  module.exports = router;
