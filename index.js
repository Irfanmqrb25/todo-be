import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TodoRoute from "./routes/TodoRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// middleware
app.use(express.json())
app.use(cors());

// routes
app.use("/api/todo", TodoRoute);
app.use("/api/user", AuthRoute)

// connect to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
