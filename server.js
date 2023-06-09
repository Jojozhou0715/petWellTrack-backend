require("dotenv").config();
const formData = require('express-form-data')
const mongoose = require('mongoose')
const {MONGODB_URI} = process.env
// const { PORT } = process.env;
const PORT = process.env.PORT || 4000
// import express
const express = require("express");
// create application object
const app = express();
const routes = require('./routes/index');
const cors = require("cors");

// MiddleWare
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(express.urlencoded({extended: true}))
app.use(express.json()); // parse json bodies
app.use(formData.parse())

// ROUTES
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.log('Error connecting to MongoDB Atlas:', err);
});

app.use("/", routes);

app.use((req, res, next) => {
  res.status(404).json({message: "NOT A PROPER ROUTE"})
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({ err: err.message })
  })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});