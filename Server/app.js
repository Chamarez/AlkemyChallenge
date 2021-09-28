const express = require('express');
const app = express();
const router = express.Router();
const passport = require('passport');
const port = 3000;
const passportConfig = require('./config/server/passportConfig');
const bodyParser = require('body-parser');


passport.use(passportConfig.createStrategy());

app.use(passport.initialize());

app.use(bodyParser.json());

app.use("/",router);

app.listen(port, ()=> {
    console.log(`App listen in port :${port}`);
  })

app.use("/user",require("./routes/userRoutes"));

app.use("/auth",require("./routes/authRoutes"));

app.use("/balance",require("./routes/balanceRouters"));
