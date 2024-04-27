const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const ratelimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//Load env vars
dotenv.config({ path: "config/config.env" });

const restaurant = require("./routes/restaurants");
const auth = require("./routes/auth");
const reservation = require("./routes/reservations");
const payments = require("./routes/payments");
const reviews = require("./routes/reviews");

const limiter = ratelimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 1000,
});

//connect to db
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(hpp());
app.use(cors());

app.use("/api/v1/restaurants", restaurant);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reservations", reservation);
app.use("/api/v1/payments", payments);
app.use("/api/v1/reviews", reviews);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Restaurant Reservation API'
    },
    servers: [
      {
        url: `${process.env.HOST}:${process.env.PORT}/api/v1`
      }
    ]
    
  },apis:['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// Discord bot API
// const botClient = require('./bot/index');

//Set static folder
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    "Server running in ",
    process.env.NODE_ENV,
    "on " + process.env.HOST + ":" + PORT
  )
);



//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server and exit process
  server.close(() => process.exit(1));
});
