// Load in enviroment variables
// --check if in production server
if (process.env.NODE_ENV !== "prodcution") {
	require("dotenv").config();
}

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {});

app.listen(3000, () => {
	console.log("server started");
});
