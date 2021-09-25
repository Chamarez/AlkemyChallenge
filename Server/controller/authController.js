const userServices = require('../services/userServices');
const exceptions = require('../common/exceptions');
const error= require('../common/error');
const jwt = require('jsonwebtoken');

///jwtoken
const config = require('../config/config');

//validator for validate credentials
var validator = require('validator');


    