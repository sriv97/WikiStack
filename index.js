const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const layout = require("./views/layout");
const { db, Page, Us } = require("./models");
const models = require("./models");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

db.authenticate().then(() => {
  console.log("connted to the database!");
});

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

const port = 3000;

const init = async () => {
  await db.sync({ force: true });
  app.listen(port, () => {
    console.log(`wikistack is listning on port ${port}`);
  });
};

init();
