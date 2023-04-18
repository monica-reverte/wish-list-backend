const express = require('express');
const { dbConnection } = require("./database/config");
const cors = require("cors");
const allRoutes  = require("./routes/indexRoutes");
// const usersRoutes  = require("./routes/users");
const cookieParser = require ("cookie-parser");
const morgan = require('morgan');




const app = express();
require("dotenv").config();

dbConnection();

// MIDDLEWARE

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

// ROUTES

app.use("/api", allRoutes);

// app.use("/api/todos", todosRoutes);
// app.use("/api/users", usersRoutes);



// SERVIDOR WEB
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT... ${process.env.PORT}`);
});
