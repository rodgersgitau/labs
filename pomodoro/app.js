const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server successfully listening on port ${PORT}`);
});
