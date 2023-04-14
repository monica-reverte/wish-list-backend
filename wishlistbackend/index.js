const express = require('express');
const { dbConnection } = require("./database/config");
const cors = require("cors");
const  todosRoutes  = require("./routes/todos");
const  usersRoutes  = require("./routes/users");
const cookieParser = require ("cookie-parser");




const app = express();
require("dotenv").config();

dbConnection();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(cookieParser());

app.use("/api/todos", todosRoutes);
app.use("/api/users", usersRoutes);



// SERVIDOR WEB
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT... ${process.env.PORT}`);
});
