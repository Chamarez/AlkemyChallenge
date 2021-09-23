require ('dotenv').config();

module.exports ={
  mysql:{
    host: "localhost",
    port: process.env.MYSQL_PORT_ENV || 3006,
    db:process.env.MYSQL_DB_ENV || "alkemy",
    username: process.env.MYSQL_USER_ENV || "root",
    password: process.env.MYSQL_PASSWORD_ENV || "root"
  }
}
