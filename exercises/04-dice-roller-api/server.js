const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // this is what allows us to get the request body from forms set to POST

app.get("/roll/", (req, res) => {
  const dice = req.query;
  const sides = dice.sides;
  console.log("User submitted sides = ", sides);
  // send the result of the roll
  const roll = Math.floor(Math.random() * sides);
  console.log(`you rolled... ${roll}`);
  res.send({ result: roll });
});

app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);
