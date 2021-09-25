const userModel = require("../models/userModel");
const error = require("../common/error");
const exceptions = require("../common/exceptions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");


const create = async ({
  username,
  password,
  email
})=>{
  console.log("user crete :"+JSON.stringify({username,password,email}));
  //Check duplicate Usarname
  const userExist = await userModel.findOne({
    where: { username: username.toLowerCase() },
  });
  if (userExist) {
    throw new error.AppError(exceptions.exceptionType.users.userExists);
  }
  //Check Duplicate Email
  const emailExist = await userModel.findOne({
    where: { email: email.toLowerCase() },
  });
  if (emailExist) {
    throw new error.AppError(exceptions.exceptionType.users.emailExists);
  }

 const data = {
  username:username.toLowerCase(),
  password: encryptPassword(password),
  email
 }

 try {
  return await userModel.create(data);
} catch (e) {
  const errorMessage = `Create User - Detail: ` + e.message;
  console.error("createUser - user_name[" + username + "]");
  throw new error.AppError(
    exceptions.exceptionType.database.entity.canNotBeCreated,
    errorMessage
  );
}
};
const encryptPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(userPassword, salt);
};

const comparePass = (userPass, hashedPass) => {
  return bcrypt.compare(userPass, hashedPass);
};

const login = async ({ username, password }) => {
  // console.log("login - user_name["+ user_name+"]"+ " - password["+ password+"]" );
  const user = await userModel.findOne({
    where: { username: username.toLowerCase() },
  });
  const isMatch = user && (await comparePass(password, user.password));
  if (!isMatch) {
    throw new error.AppError(
      exceptions.exceptionType.users.invalidPassword,
      "userService.login"
    );
  }
  const token = generateToken(user.userId, user.username);
  return { token };
};

const generateToken = (userId, username) => {
  return jwt.sign(
    {
      userId: userId,
      username: username,
      rol: "ADMIN",
    },
    config.get("auth.secret"),
    {
      expiresIn: config.get("auth.tokenExpire"),
    }
  );
};


const getAllService = async ({ condition, email }) => {
  console.log("getAllService - condition : " + condition + "  email: " + email);
  const where = {};
  if (condition) {
    where.condition = condition;
  }
  if (email) {
    where.email = email;
  }

  const usuarios = await userModel.findAll({
    atributes: [" condition", "email"],
    where: where,
  });
  // const usuarios = await userModel.findAll({condition,email})
  console.log(" usuarios return :" + usuarios);
  return usuarios;
};

const getById = async (id) => {
  console.log("getById -id: " + id);
  const usuario = await userModel.findByPk(id);
  if (!usuario) {
    throw new error.AppError(exceptions.exceptionType.productos.notFound);
  }

  console.log("user return :" + usuario);
  return usuario;
};


const updated = async (id, data) => {
  const { username, name, last_name, country, city, email, condition } = data;
  // console.log("actualizar produucto"+JSON.stringify({user_name,name,last_name,country,city,email,condition}));
  const user = await userModel.update(
    { condition },
    {
      where: {
        userId: id,
      },
    }
  );
  if (!user) {
    return false;
  }

  return true;
};

const deleted = async (id) => {
  // console.log("Deleted -id: " + id);
  const userId = id;
  const usuario = await userModel.destroy({
    where: {
      userId: userId,
    },
  });
  if (!usuario) {
    throw new error.AppError(exceptions.exceptionType.productos.notFound);
  }

  console.log("deleted return :" + userId);
  return "user deleted :" + userId;
};


module.exports = {
create,
encryptPassword,
comparePass,
login,
generateToken,
getAllService,
getById,
updated,
deleted

}
