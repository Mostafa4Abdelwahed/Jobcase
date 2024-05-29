const express = require('express')
const app = express()
require("dotenv").config();
const cors = require("cors")
const { connectDB } = require('./Database/connectDB');
const { notFound, errorHandler } = require('./src/middlewares/error');

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

// Connect Database
connectDB();

app.use("/api/auth", require("./src/modules/User/user.router"))
app.use("/api/job", require("./src/modules/Job/job.router"))

// Error Handler Middleware
app.use(notFound)
app.use(errorHandler)


app.listen(port, () => console.log(`Server Is Running In Port ${port}`))