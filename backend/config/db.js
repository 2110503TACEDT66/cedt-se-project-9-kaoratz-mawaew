const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');

const positiveMessages = [
    "Believe in yourself and all that you are.",
    "You are capable of amazing things.",
    "Every day is a new beginning.",
    "You are loved and appreciated.",
    "Your hard work will pay off.",
    "Keep going, you're making progress.",
    "You have the power to make a difference.",
    "Success is just around the corner.",
    "You are stronger than you think.",
    "Your positivity is contagious."
];

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    const randomSentence = generateRandomMessage();



    Reservation.schema.pre('save', async function (next) {
        if (this.resvDate < new Date() && !this.completed) {
            this.completed = true;
        }
        next();
    });

    setInterval(async () => {
        try {
            const result = await Reservation.updateMany({ resvDate: { $lt: new Date() }, completed: false }, { $set: { completed: true } });
        } catch (error) {
            console.log(randomSentence);
        }
    }, 60000);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

function generateRandomMessage() {
    const randomIndex = Math.floor(Math.random() * positiveMessages.length);
    return positiveMessages[randomIndex];
  }

module.exports = connectDB;