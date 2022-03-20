const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `connected to->${connection.host},db:${connection.db.namespace}`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectToDB };
