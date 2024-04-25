const express = require("express");
const https = require("https");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express());

// checking
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

let API = "https://jsonplaceholder.typicode.com/users";

app.get("/api", async (req, res) => {
  const data = await fetch(API);
  const dataJSON = await data.json();
  console.log(dataJSON);
  res.send(dataJSON);
});

// app.post("/", async (req, res) => {
//   const data = awat fetch(API, {
//       method: "POST",
//       content: "application/json",
//       body : JSON.stringify({

//       })
//   })
//   const data = req.body;
//   res.send(data);
// });
