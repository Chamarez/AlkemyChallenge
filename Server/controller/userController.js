const userServices = require('../services/userServices');
const exceptions = require('../common/exceptions');
const error= require('../common/error');

const getAll = async (req,res) => {
  const usario = await userServices.getAllService();
  res.status(200).json(usario);
}

const getById = async (req,res)=>{
  const params = req.params
  console.log("getById controller - params : "+JSON.stringify(params))
  const id = params.id
  //Call userService
  const usuarios = await userServices.getById(id)
  res.status(200).json(usuarios)
}

const create = async (req, res) => {  
  const data = req.body
  console.log("llega en el body "+JSON.stringify(data));
  const userId = await userServices.create(data);
  res.status(200).json({userId})
}

const login = async (req, res) => {
  const data = req.body;  
  const tok = await userServices.login(data);
  const token = tok.token
  res.json({token});
}


module.exports ={
  getAll,
  getById,
  create,
  login
};
