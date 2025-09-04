const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // this is what allows us to get the request body from forms set to POST

let players = [];
app.post("/guestbook", (req, res) => {
  const userName = req.body.name;
  console.log("User submitted:", userName);
  res.send(`Thanks, ${userName}!`);
  players.push(userName);
});

app.get("/api/players", (req, res) => {
  if (players.length <= 0) {
    res.json({ message: "no players yet", players: [] });
  } else {
    res.json(players);
  }
});

app.get("/players", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "players.html"));
});

app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);
