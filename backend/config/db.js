const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const conn = await mongoose.connect(process.env.MONGO_URI);

  Reservation.schema.pre("save", async function (next) {
    if (this.resvDate < new Date() && !this.completed) {
      this.completed = true;
    }
    next();
  });

  setInterval(async () => {
    try {
      const result = await Reservation.updateMany(
        { resvDate: { $lt: new Date() }, completed: false },
        { $set: { completed: true } }
      );
    } catch (error) {
      console.log("Fuck You");
    }
  }, 60000);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
