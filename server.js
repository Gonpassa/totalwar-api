const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const api = require("./controller/api");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/api", api.submitMessage);

app.get("/api/:text", async (req, res) => {
  messages.push(req.params.text.toLowerCase().trim());
  try {
    const result = await generateResponse(messages);
    return res.json(result);
  } catch (error) {
    return res.json({ error: error });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log("server listening on PORT " + PORT);
});
