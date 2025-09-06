const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // this is what allows us to get the request body from forms set to POST

class Post {
  constructor(body, time) {
    this.postBody = body;
    this.time = time;
  }
}

app.post("/notes", (req, res) => {
  // get timestamp
  const currentTime = getTime();
  // create a new obj
  const myPost = new Post(req.body.postbody, currentTime);
  console.log(myPost);
  // store objs in memory
  posts.storePost(myPost);
});

app.get("/notes", (req, res) => {
  res.send(posts.getPosts());
});

function getTime() {
  const currentTime = new Date();
  return currentTime.toLocaleTimeString();
}

const posts = (function () {
  const postArr = [];

  return {
    storePost: function (post) {
      postArr.push(post);
      return postArr;
    },
    getPosts: () => {
      return postArr;
    },
  };
})();

app.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);
