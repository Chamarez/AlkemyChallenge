const express = require('express');
const router = express.Router({mergeParams:true});
const routeController = require('../common/routeController');
///const budgetController = require('../common/budgetController');
const userController = require('../controller/userController');


router.post('/singin', (req, res)=>{
    routeController.handleRequest(req, res, userController.login);
});


module.exports = router;    