require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = parseInt(process.env.PORT) || 8000;
const cors = require("cors");

const apiRouter = require("./api/api.v1");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/v1/", apiRouter);


// mongoose.connect(process.env.DB_URL, {}, (error) => {
// 	if (error) throw error;
// 	console.log("Database connected");
// });

mongoose.connect(process.env.DB_URL).then(() => {
	console.log("connected to database");
}).catch((error) => {
	console.log("error connecting to database ", error);
});

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log("listening on port " + PORT);
});