const express = require('express');
const { dbConnection } = require("./database/config");
const cors = require("cors");
const allRoutes  = require("./routes/indexRoutes");
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

//ERROR HANDLER

app.use((err, req, res,ç) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internatl Server Error";

    return res.status(status).json({message, stack: err.stack });
})




// SERVIDOR WEB
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT... ${process.env.PORT}`);
});
