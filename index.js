const express = require("express");
const bodyParser = require("body-parser");
const posts = require("./routes/posts.js");
const user = require("./routes/user.js");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

// Routes
app.use(posts);
app.use(user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
