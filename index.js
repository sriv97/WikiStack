const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));



app.get("/", (req,res,next) => {
	console.log("Hello World!");
});

const port = 1337;

app.listen(port, () => {
	console.log(`wikistack is listning on port ${port}`);
});
