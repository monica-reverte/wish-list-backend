const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Could not initialize DB");
  }
};

module.exports = {
  dbConnection,
};