const express = require("express");
const app = express();
const router = express.Router();
const port = 3001;
const bodyParser = require('body-parser');

app.use("/",router);
app.listen(port, ()=>{
    console.log(`Server is running ${port}`);
});
