const express = require("express");
const bodyparser = require("body-parser");
const path = require('path');
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const app = express();

// MongoDB connection
mongoose
    .connect("mongodb://localhost:27017/Ramu", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log(`Successfully connected to Database`);
    })
    .catch((error) => {
        console.log(`Unable to connect to MongoDB`);
        console.error(error);
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Request-with,Content,Accept,Content-Type"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    next();
});

// body-Parser Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

//setup Routes
const userRoutes = require("./routes/user");
app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`Server started on port : ${port}`);
  });