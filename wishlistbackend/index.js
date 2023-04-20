const express = require('express');
const { dbConnection } = require("./database/config");
const cors = require("cors");
const allRoutes  = require("./routes/indexRoutes");





const app = express();
require("dotenv").config();



// MIDDLEWARE

app.use(cors());
app.use(express.json());


// ROUTES

app.use("/api", allRoutes);

dbConnection();



// SERVIDOR WEB
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT... ${process.env.PORT}`);
});
