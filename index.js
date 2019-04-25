const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const layout = require("./views/layout");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));



app.get("/", (req,res,next) => {
	res.send(layout('Hi'));
	console.log("Hello World!");
});

const port = 3000;

app.listen(port, () => {
	console.log(`wikistack is listning on port ${port}`);
});
