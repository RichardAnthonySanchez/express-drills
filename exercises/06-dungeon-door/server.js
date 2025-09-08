const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // this is what allows us to get the request body from forms set to POST

app.get("/notes", (req, res) => {
  const query = req.query.password;

  if (query === "hello") {
    res.redirect("/players");
  } else {
    res.redirect("/404");
  }
});

app.get("/players", (req, res) => {
  res.send("you have access to protected data");
});

app.get("/{*splat}", (req, res) => {
  res.send("this page does not exist");
});

app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);
