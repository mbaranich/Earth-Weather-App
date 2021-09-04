// Load in enviroment variables
// --check if in production server
if (process.env.NODE_ENV !== "prodcution") {
	require("dotenv").config();
}

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;
const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/weather", (req, res) => {
	const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${req.body.latitude},${req.body.longitude}&units=f`;
	axios({
		url: url,
		responseType: "json",
	}).then((data) => res.json(data.data.current));
});

app.listen(3000, () => {
	console.log("server started");
});
