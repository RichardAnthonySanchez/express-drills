const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const HOST = "0.0.0.0";

console.log("Current working directory:", process.cwd()); // this checks where the server command was ran. NOT WHERE THE SCRIPT LIVES

app.use(express.static(path.join(__dirname, "public")));

// this alt works too
//app.use(express.static("./exercises/02-local-cafe/public"));

app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);
